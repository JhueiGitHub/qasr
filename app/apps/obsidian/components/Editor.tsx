import React from "react";
import { useStyles } from "@os/hooks/useStyles";

const Editor: React.FC = () => {
  const { getColor, getFont } = useStyles();

  return (
    <div
      className="flex-1 p-6 rounded-lg"
      style={{
        backgroundColor: getColor("Overlaying BG"),
        color: getColor("Text Primary (Hd)"),
        fontFamily: getFont("Text Primary"),
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Welcome to Obsidian Clone</h1>
      <p>This is a placeholder for the main editor area.</p>
      <p>Select a file from the sidebar to start editing.</p>
    </div>
  );
};

export default Editor;
