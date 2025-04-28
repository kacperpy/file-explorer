import { File } from "../data/types";

export const useTraverseTree = () => {
  function insertNode(
    tree: File,
    fileId: string,
    fileName: string,
    isFolder: boolean
  ) {
    if (tree.id === fileId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(),
        name: fileName,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }

    // depth first search
    let latestNode: File[] = [];
    latestNode = tree.items.map((fileItem) => {
      return insertNode(fileItem, fileId, fileName, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  return { insertNode };
};
