import "./App.css";
import { Folder } from "./components/Folder";
import fileData from "./data/folderData";

function App() {
  return (
    <>
      <Folder rootFile={fileData} />
    </>
  );
}

export default App;
