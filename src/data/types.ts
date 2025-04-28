export type File = {
  id: string;
  name: string;
  isFolder: boolean;
  items: File[];
};
