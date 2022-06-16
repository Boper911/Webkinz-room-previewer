import { CSSProperties, FC, ReactNode, useCallback, useEffect } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

export interface BoxProps {
    id: any;
    url: string;
    left: number;
    top: number;
}

export const Box: FC<BoxProps> = ({ id, url, left, top }) => {
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: "box",
            item: { id, url, left, top },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [url, id, left, top]
    );

    const style: CSSProperties = {
        position: "absolute",
        padding: "0.5rem 1rem",
        cursor: "move",
    };

    return (
        <>
            <DragPreviewImage connect={preview} src={url} />
            <div
                className="box"
                style={{ ...style, left, top, opacity: isDragging ? 0.5 : 1 }}
                data-testid="box"
            >
                <img width={500} src={url} ref={drag} />
            </div>
            {/* <DragPreviewImage connect={preview} src={url} />
            <div
                className="box"
                ref={drag}
                style={{
                    ...style,
                    opacity: isDragging ? 0.5 : 1,
                }}
            >
                ♘
            </div> */}
        </>
    );
};
