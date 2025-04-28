import { useState } from "react";
import { File } from "../data/types";

interface FileProps {
  rootFile: File;
}

export const Folder = ({ rootFile }: FileProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setExpand(!expand)}
      >
        <h2>{rootFile.isFolder ? "📁" : "📄"}</h2>
        <h2>{rootFile.name}</h2>
      </div>
      {expand && rootFile.items && (
        <div style={{ paddingLeft: 20 }}>
          {rootFile.items.map((fileItem) => (
            <Folder key={fileItem.id} rootFile={fileItem} />
          ))}
        </div>
      )}
    </div>
  );
};
