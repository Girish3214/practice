function useTaverseTree() {
  function insertNode(tree, insertId, name, isFolder) {
    if (tree.id === insertId) {
      tree.items.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        items: [],
      });
    } else {
      tree.items.map((sub) => insertNode(sub, insertId, name, isFolder));
    }
  }

  function deleteNode(tree, folderId, rootId) {
    let t1 = tree;
    if (t1.id === folderId) {
      return;
    } else {
      let returnData = t1.items.filter((it) =>
        deleteNode(it, folderId, rootId)
      );
      return { ...t1, items: returnData };
    }
  }

  return { insertNode, deleteNode };
}

export default useTaverseTree;
