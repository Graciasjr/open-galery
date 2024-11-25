export interface Photo {
  id: string;
  fileId:string;
  file:string;
  name:string;
  nativeMimeType:string;
  ext:string;
  url: string;
  title: string;
  author: string;
  likes: number;
  comments: Comment[];
  reactions: Reaction[];
  albumId?: string;
}

export interface Album {
  id: string;
  expand:object;
  children:[];
  // photoCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Reaction {
  type: '❤️' | '👍' | '🔥' | '😍' | '🎨';
  count: number;
}