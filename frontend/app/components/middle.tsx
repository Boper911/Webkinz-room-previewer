import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/generateRoom.module.css";
import Image from "next/image";
import { getImage } from "../api/api";

import Container from "./DnD/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = { wallpaperPreview: string; flooringPreview: string };

export default function Middle({ wallpaperPreview, flooringPreview }: Props) {
    const [imageSize, setImageSize] = useState<string>("Small");
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
    const [selectedFlooring, setSelectedFlooring] = useState<string>("");

    //const { wallpaper, flooring } = useContext(SelectedPartsContext);

    useEffect(() => {
        const fetchData = async () => {
            if (wallpaperPreview != "") {
                await fetchImage(
                    "wallpaper",
                    wallpaperPreview + imageSize + ".png"
                );
            }
            if (flooringPreview != "") {
                await fetchImage(
                    "flooring",
                    flooringPreview + imageSize + ".png"
                );
            }
        };

        fetchData();
    }, [wallpaperPreview, flooringPreview]);

    async function fetchImage(type: string, name: string) {
        const response = await getImage(type, name);
        if (type == "wallpaper") setSelectedWallpaper(response.url);
        if (type == "flooring") setSelectedFlooring(response.url);
    }

    const sizeChange = async (size: string) => {
        setImageSize(size);

        if (wallpaperPreview != "") {
            await fetchImage("wallpaper", wallpaperPreview + size + ".png");
        }
        if (flooringPreview != "") {
            await fetchImage("flooring", flooringPreview + size + ".png");
        }
    };

    const button_style =
        "border focus:outline-none  focus:ring-4 \
    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 \
    bg-gray-800 text-white border-gray-600 hover:bg-gray-70 \
    focus:ring-gray-700 \
    disabled:transform-none disabled:transition-none disabled:text-gray-500 \
    disabled:bg-gray disabled:text-white disabled:shadow-none disabled:hover:bg-gray-70";

    return (
        <div className={styles.middle_main}>
            <div className="flex items-center justify-center px-4 py-5">
                <button
                    onClick={() => sizeChange("Small")}
                    className={button_style}
                >
                    Small
                </button>
                <button
                    onClick={() => sizeChange("Medium")}
                    className={button_style}
                >
                    Medium
                </button>
                <button
                    onClick={() => sizeChange("Large")}
                    className={button_style}
                >
                    Large
                </button>
            </div>

            <div className={styles.image_stack}>
                <DndProvider backend={HTML5Backend}>
                    <Container
                        wallpaper={selectedWallpaper}
                        flooring={selectedFlooring}
                    />
                </DndProvider>

                {/* <img className={styles.item__top} src={selectedWallpaper} />
        <img className={styles.item__bottom} src={selectedFlooring} /> */}
            </div>
        </div>
    );
}
