import React, { useState } from "react";
import { File } from "../data/types";

interface FileProps {
  rootFile: File;
  handleInsertNode: (
    fileId: string,
    fileName: string,
    isFolder: boolean
  ) => void;
}

export const Folder = ({ rootFile, handleInsertNode }: FileProps) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    isFolder: false,
    visible: false,
  });

  const handleCreateNewFile = (e: React.MouseEvent, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ isFolder, visible: true });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
      handleInsertNode(
        rootFile.id,
        (e.target as HTMLInputElement).value,
        showInput.isFolder
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          gap: 32,
        }}
        onClick={() => setExpand(!expand)}
      >
        <h2>{rootFile.isFolder ? "📁" : "📄"}</h2>
        <h2>{rootFile.name}</h2>
        {expand && rootFile.isFolder && (
          <div style={{ display: "flex", gap: 8, alignContent: "center" }}>
            <button
              onClick={(e) => handleCreateNewFile(e, true)}
              style={{ fontSize: 14 }}
            >
              + folder
            </button>
            <button
              onClick={(e) => handleCreateNewFile(e, false)}
              style={{ fontSize: 14 }}
            >
              + file
            </button>
          </div>
        )}
      </div>
      {showInput.visible && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingLeft: 20,
          }}
        >
          <h2>{showInput.isFolder ? "📁" : "📄"}</h2>
          <input
            onKeyDown={onAddFolder}
            type="text"
            autoFocus
            onBlur={() => setShowInput({ ...showInput, visible: false })}
          />
        </div>
      )}
      {expand && rootFile.items && (
        <div style={{ paddingLeft: 20 }}>
          {rootFile.items.map((fileItem) => (
            <Folder
              key={fileItem.id}
              rootFile={fileItem}
              handleInsertNode={handleInsertNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
