import React, { useContext } from "react";
import styles from "../styles/generateRoom.module.css";
import Image from "next/image";
type Props = { type: string; imageList: any; handler: Function };

export default function Header({ type, imageList, handler }: Props) {
    const imageClick = async (image: string) => {
        let url = image;
        let urlParts = url.split("/");
        let itemName = urlParts[urlParts.length - 1];
        itemName = itemName.split(".")[0]; // remove .png

        handler(type, itemName);
    };

    return (
        <div
            className={styles.image_grid}
            style={{ minHeight: "82vh", maxHeight: "82vh", overflow: "auto" }}
        >
            {imageList.map(
                (
                    image: string, // image is a src_url to the server. like http://192.168.1.5:5000/api/image/flooring/Bakeshopflooring.png
                    index: number
                ) => (
                    <a onClick={() => imageClick(image)} key={index}>
                        <img src={image} key={index} width={100} height={100} />
                    </a>
                )
            )}
        </div>
    );
}
