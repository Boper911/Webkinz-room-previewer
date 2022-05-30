import React from "react";
import Button from "./button";

type Props = {};

export default function Header({}: Props) {
  return (
    <div>
      <Button text="Small" />
      <Button text="Medium" />
      <Button text="Large" />
    </div>
  );
}
