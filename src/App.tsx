import { useState } from "react";
import "./App.css";
import { Folder } from "./components/Folder";
import fileData from "./data/folderData";
import { useTraverseTree } from "./hooks/useTraverseTree";
import { File } from "./data/types";

function App() {
  const { insertNode } = useTraverseTree();
  const [fileExplorerData, setFileExplorerData] = useState<File>(fileData);

  const handleInsertNode = (
    fileId: string,
    fileName: string,
    isFolder: boolean
  ) => {
    const finalTree = insertNode(fileExplorerData, fileId, fileName, isFolder);

    setFileExplorerData(finalTree);
  };
  return (
    <>
      <Folder handleInsertNode={handleInsertNode} rootFile={fileExplorerData} />
    </>
  );
}

export default App;
