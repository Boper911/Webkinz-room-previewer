import React, { useEffect, useState } from "react";
import styles from "../styles/generateRoom.module.css";
import { getImage } from "../api/api";
import DragImages from "./Draggable/DragImages";

type Props = {
    size: string;
    wallpaperPreview: string;
    flooringPreview: string;
};

export default function ImageInteraction({
    size,
    wallpaperPreview,
    flooringPreview,
}: Props) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
    const [selectedFlooring, setSelectedFlooring] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (wallpaperPreview != "") {
                await fetchImage("wallpaper", wallpaperPreview + "large" + ".png");
            }
            if (flooringPreview != "") {
                await fetchImage("flooring", flooringPreview + "large" + ".png");
            }
        };

        fetchData();
    }, [size, wallpaperPreview, flooringPreview]);

    async function fetchImage(type: string, name: string) {
        const response = await getImage(type, name);
        if (type == "wallpaper") setSelectedWallpaper(response.url);
        if (type == "flooring") setSelectedFlooring(response.url);
    }

    return (
        <div
            className={styles.image_stack}
            style={{ width: "100%", height: "100%" }}
        >
            <DragImages
                wallpaper={selectedWallpaper}
                flooring={selectedFlooring}
            />
        </div>
    );
}
