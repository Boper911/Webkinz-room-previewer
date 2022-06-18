import React, { useState } from "react";

import styles from "../styles/generateRoom.module.css";

import Middle from "./middle";
import ImagePicker from "./ImagePicker/ImagePicker";

type Props = {};

export default function GenerateRoom({}: Props) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
    const [selectedFlooring, setSelectedFlooring] = useState<string>("");

    const callbackShowPart = async (type: string, item: string) => {
        if (type == "wallpaper") setSelectedWallpaper(item);
        if (type == "flooring") setSelectedFlooring(item);
    };

    return (
        <div className={styles.main}>
            <div className="bg-slate-800">
                <ImagePicker type="wallpaper" handler={callbackShowPart} />
            </div>

            <div className={styles.item_main}>
                <Middle
                    wallpaperPreview={selectedWallpaper}
                    flooringPreview={selectedFlooring}
                />
            </div>

            <div className="bg-slate-800">
                <ImagePicker type="flooring" handler={callbackShowPart} />
            </div>
        </div>
    );
}
