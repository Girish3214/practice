import React, { useState } from "react";
import "../assets/styles.css";

function FileExplorer({
  explorer,
  rootId,
  handleInsertNode,
  handleDeleteNode,
}) {
  const [expand, setExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState({
    show: false,
    isFolder: false,
  });

  const [showAddButtons, setShowAddButtons] = useState(false);

  const handleFolderExpansion = (e) => {
    setExpand((prev) => !prev);
  };

  const addFolderFile = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      show: true,
      isFolder,
    });
  };

  const deleteFolderFile = (e, folderId) => {
    e.stopPropagation();
    handleDeleteNode(folderId);
  };

  const handleEnter = (e) => {
    if (!inputValue || inputValue === "") return;
    if (e.keyCode === 13) {
      handleInsertNode(explorer.id, inputValue, showInput.isFolder);
      setShowInput({
        show: false,
        isFolder: null,
      });
      setInputValue("");
    }
  };

  return (
    <div className="folder__container">
      <div
        className="title__btns--container"
        onClick={(e) => handleFolderExpansion(e)}
        onMouseOver={() => setShowAddButtons(true)}
        onMouseLeave={() => setShowAddButtons(false)}
      >
        <span>
          {explorer.isFolder ? "📁" : "📄"} {explorer.name}
        </span>
        {showAddButtons && (
          <div className="action__btns">
            {explorer.isFolder && (
              <>
                <button onClick={(e) => addFolderFile(e, true)}>+📁</button>
                <button onClick={(e) => addFolderFile(e, false)}>+📄</button>
              </>
            )}
            {explorer.id !== rootId && (
              <button onClick={(e) => deleteFolderFile(e, explorer.id)}>
                ❌
              </button>
            )}
          </div>
        )}
      </div>
      {showInput.show && (
        <div style={{ marginLeft: "25px" }}>
          {showInput.isFolder ? "📁" : "📄"}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setShowInput({ show: false, isFolder: null })}
            autoFocus
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      )}

      {expand && (
        <div style={{ paddingLeft: "25px" }}>
          {explorer?.items
            .sort((a, b) => (a.isFolder && a.name < b.name ? -1 : 1))
            ?.map((it) => (
              <div key={it.id}>
                <FileExplorer
                  explorer={it}
                  handleInsertNode={handleInsertNode}
                  handleDeleteNode={handleDeleteNode}
                  rootId={rootId}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
