import React, { useState } from "react";

import styles from "../styles/layout.module.css";

import ImageInteraction from "./ImageInteraction";
import ImagePicker from "./ImagePicker/ImagePicker";

type Props = {};

// #page > header {
//     grid-area: head;
//     background-color: #8ca0ff;
//   }

//   #page > #sidebar {
//     grid-area: sidebar;
//     background-color: #ffa08c;
//   }

//   #page > #middle {
//     grid-area: middle;
//     background-color: #ffff64;
//   }

//   #page > footer {
//     grid-area: footer;
//     background-color: #8cffa0;
//   }

export default function GenerateRoom({}: Props) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
    const [selectedFlooring, setSelectedFlooring] = useState<string>("");
    const [imageSize, setImageSize] = useState<string>("Small");

    const callbackShowPart = async (type: string, item: string) => {
        if (type == "wallpaper") setSelectedWallpaper(item);
        if (type == "flooring") setSelectedFlooring(item);
    };

    return (
        <div className="bg-slate-800">
            <div className={styles.page}>
                <header className="flex items-center justify-center px-4 py-5">
                    <Button
                        callback={() => setImageSize("Small")}
                        text="Small"
                    />
                    <Button
                        callback={() => setImageSize("Medium")}
                        text="Medium"
                    />
                    <Button
                        callback={() => setImageSize("Large")}
                        text="Large"
                    />
                </header>

                <div className={styles.sidebar}>
                    <div className="border-r-2 bg-slate-800 border-slate-700">
                        <ImagePicker
                            type="wallpaper"
                            callback={callbackShowPart}
                        />
                    </div>
                </div>

                <div className={styles.middle}>
                    <ImageInteraction
                        size={imageSize}
                        wallpaperPreview={selectedWallpaper}
                        flooringPreview={selectedFlooring}
                    />
                </div>

                <div className={styles.sidebar2}>
                    <div className="border-l-2 bg-slate-800 border-slate-700">
                        <ImagePicker
                            type="flooring"
                            callback={callbackShowPart}
                        />
                    </div>
                </div>

                <footer className="flex items-center justify-center px-4 py-5">
                    <Button callback={() => {}} text="About" />
                </footer>
            </div>
        </div>
    );
}

type ButtonProps = { text: string; callback: Function };
function Button({ text, callback: callback }: ButtonProps) {
    const button_style =
        "border focus:outline-none  focus:ring-4 \
        font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 \
        bg-gray-800 text-white border-gray-600 hover:bg-gray-70 \
        focus:ring-gray-700 \
        disabled:transform-none disabled:transition-none disabled:text-gray-500 \
        disabled:bg-gray disabled:text-white disabled:shadow-none disabled:hover:bg-gray-70";

    return (
        <button onClick={() => callback()} className={button_style}>
            {text}
        </button>
    );
}
