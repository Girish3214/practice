import { useState } from "react";
import FileExplorer from "./FileExplorer";
import useTaverseTree from "../hooks/useTaverseTree";
import FolderData from "../utils/FolderData";

function Explorer() {
  const { insertNode, deleteNode } = useTaverseTree();
  const [explorer, setExplorer] = useState(FolderData);

  const handleInsertNode = (folderId, name, isFolder) => {
    insertNode(explorer, folderId, name, isFolder);
  };

  const handleDeleteNode = (folderId) => {
    let updatedData = deleteNode(explorer, folderId);
    setExplorer(updatedData);
  };
  return (
    <div style={{ margin: "1rem" }}>
      <FileExplorer
        explorer={explorer}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        rootId={explorer.id}
      />
    </div>
  );
}

export default Explorer;
