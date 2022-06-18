import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

export interface DragItem {
    type: string;
    id: string;
}

type Props = { wallpaper: string; flooring: string };
export default function DragImages({ wallpaper, flooring }: Props) {
    const [boxes, setBoxes] = useState<{
        [key: string]: {
            url: string;
        };
    }>({
        a: { url: wallpaper },
        b: { url: flooring },
    });

    // Set default positions, window didnt exist before running in the useEffect
    useEffect(() => {
        setBoxes({
            a: { url: wallpaper }, // some magic numbers that works with most walls
            b: { url: flooring }, // some magic numbers that works with most walls
        });
    }, []);

    useEffect(() => {
        setBoxes({
            a: { url: wallpaper },
            b: { url: flooring },
        });
    }, [wallpaper, flooring]);

    return (
        <>
            {Object.keys(boxes).map((key) => {
                const { url } = boxes[key] as {
                    url: string;
                };

                return (
                    <Draggable>
                        <Resizable
                            defaultSize={{
                                width: 400,
                                height: 360,
                            }}
                            style={{
                                position: "absolute",
                                backgroundSize: "contain",
                                backgroundImage: `url(${url})`,
                                backgroundRepeat: "no-repeat",
                            }}
                            lockAspectRatio={true}
                        ></Resizable>
                    </Draggable>
                );
            })}
        </>
    );
}
