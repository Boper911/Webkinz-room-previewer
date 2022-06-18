import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/generateRoom.module.css";
import Image from "next/image";
import { getImage } from "../api/api";

import Container from "./DnD/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
                await fetchImage("wallpaper", wallpaperPreview + size + ".png");
            }
            if (flooringPreview != "") {
                await fetchImage("flooring", flooringPreview + size + ".png");
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
            <DndProvider backend={HTML5Backend}>
                <Container
                    wallpaper={selectedWallpaper}
                    flooring={selectedFlooring}
                />
            </DndProvider>
        </div>
    );
}
