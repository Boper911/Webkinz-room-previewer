import update from "immutability-helper";
import { CSSProperties, FC, useEffect } from "react";
import { useCallback, useState } from "react";
import type { XYCoord } from "react-dnd";
import { useDrop } from "react-dnd";

import { Box } from "./Box";
import Image from "next/image";
const styles: CSSProperties = {
  width: "100%",
  height: "90vh",
  position: "relative",
};

type Props = { wallpaper: string; flooring: string };

export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; title: string } };
}

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}

export default function Container({ wallpaper, flooring }: Props) {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number;
      left: number;
      url: string;
    };
  }>({
    a: { top: 0, left: 0, url: wallpaper },
    b: { top: 0, left: 0, url: flooring },
  });

  // Set default positions, window didnt exist before running in the useEffect
  useEffect(() => {
    setBoxes({
      a: { top: 0, left: window.innerWidth / 12, url: wallpaper }, // some magic numbers that works with most walls
      b: { top: 270, left: window.innerWidth / 12, url: flooring }, // some magic numbers that works with most walls
    });
  }, []);

  useEffect(() => {
    setBoxes((prev) => ({
      a: { ...prev.a, url: wallpaper },
      b: { ...prev.b, url: flooring },
    }));
  }, [wallpaper, flooring]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, url } = boxes[key] as {
          top: number;
          left: number;
          url: string;
        };
        return (
          <Box key={key} id={key} left={left} top={top}>
            <img width={500} src={url} />
          </Box>
        );
      })}
    </div>
  );
}
