import React from "react";

interface Text {
  text: string;
}

export default function Button({ text }: Text) {
  return (
    <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
      {text}
    </button>
  );
}
