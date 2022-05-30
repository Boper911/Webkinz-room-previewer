const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");
const path = require('path');
const { readdirSync } = require('fs');
const url = require('url');

const app = express();
app.use(cors());
app.use(json());


const ADDRESS = process.env.SERVER_ADDRESS || "localhost";
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${ADDRESS}:${PORT}`))


const CURSOR_STEPS = 25;


app.get("/api/preview/:type", async (req, res, next) => {
    // Init
    const cursor = parseInt(req.query.nextCursor) || 0;
    const previewType = req.params.type

    // Pre-Check
    if (!["wallpaper", "flooring", "wallpaint"].includes(previewType))
        return res.send({ "success": false, "type": previewType, "data": [], "nextCursor": cursor })

    // Logic
    const [previews, cursorStop] = await getPreviews(previewType, cursor);

    // Post-Check
    const success = previews.length > 0 ? true : false;
    const nextCursor = cursorStop ? false : cursor + CURSOR_STEPS;

    // Done
    return res.send({ "success": success, "type": previewType, "data": previews, "nextCursor": nextCursor })
});


app.get("/api/image/:type/:file", async (req, res, next) => {
    const requestImageName = req.params.file
    const requestImageType = req.params.type

    if (requestImageType != "wallpaper" && requestImageType != "flooring" && requestImageType != "wallpaint") {
        res.status(400);
        return res.send({ "success": false, "type": requestImageType, "data": "Type doesnt exist" })
    }

    const options = {
        root: path.join(__dirname, "public", requestImageType),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    return res.sendFile(requestImageName, options);
});


app.get("/api/search/:type", async (req, res, next) => {
    // console.log(req);
    // console.log(res);

    // Init
    const expression = (req.query.expression || "").toLowerCase();
    const cursor = parseInt(req.query.nextCursor) || 0;
    const previewType = (req.params.type || "").toLowerCase()
    const requrl = url.format({ protocol: req.protocol, host: req.get('host'), });

    console.log("params", expression, cursor, previewType, requrl);

    // Pre-Check
    if (!["wallpaper", "flooring", "wallpaint"].includes(previewType))
        return res.send({ "success": false, "type": previewType, "data": [], "nextCursor": cursor })

    // Logic
    const [previews, cursorStop] = await getFilteredPreviews(requrl, previewType, expression, cursor);

    // Post-Check
    const success = previews.length > 0 ? true : false;
    const nextCursor = cursorStop ? false : cursor + CURSOR_STEPS;

    // Done
    return res.send({ "success": success, "type": previewType, "data": previews, "nextCursor": nextCursor })
});

async function getFilteredPreviews(requrl, folder, expression, cursor) {
    const filePath = path.join(__dirname, "public", folder)
    const filteredPreview = readdirSync(filePath).filter(fileName => {
        let name = fileName.toLowerCase();
        return name.search(expression) != -1 && !(name.endsWith("small.png") || name.endsWith("medium.png") || name.endsWith("large.png"))
    })
    const slicedPreview = filteredPreview.slice(cursor, cursor + CURSOR_STEPS);
    const urlPreview = slicedPreview.map(name => { return requrl + `/api/image/${folder}/` + name });

    console.log("urlPreview", urlPreview);
    console.log("expression", expression);
    console.log(cursor, CURSOR_STEPS, urlPreview.length, cursor + CURSOR_STEPS >= urlPreview.length);

    if (cursor + CURSOR_STEPS >= filteredPreview.length)
        return [urlPreview, true];

    return [urlPreview, false];
}

async function getPreviews(folder, cursor) {

    const filePath = path.join(__dirname, "public", folder)
    const preview = readdirSync(filePath).filter(name => !(name.endsWith("Small.png") || name.endsWith("Medium.png") || name.endsWith("Large.png")))
    const slicedPreview = preview.slice(cursor, cursor + CURSOR_STEPS);

    if (cursor + CURSOR_STEPS >= preview.length)
        return [slicedPreview, true];

    return [slicedPreview, false];
}

async function name(params) {

}