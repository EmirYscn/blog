export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  AUTHOR = "AUTHOR",
}

export type Profile = {
  id: string;
  bio?: string | null;
  userId: string;
  user?: User;
};

export type User = {
  id: string;
  email: string;
  username?: string | null;
  password?: string | null;
  role?: ROLE;
  avatar?: string | null;

  posts?: Post[];
  profile?: Profile | null;
  comments?: Comment[];
  media?: Media[];
  likes?: Like[];
};

export type Post = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
  title: string;
  description?: string | null;
  content?: string | null;
  published: boolean;
  featured: boolean;
  authorId: string;
  _count: { likes: number; comments: number };

  author?: User;
  comments?: Comment[];
  tags: string[];
  media?: Media[];
  likes?: Like[];
};

export type Comment = {
  id: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  postId: string;
  authorId: string;
  parentId?: string | null;
  _count: { likes: number; replies: number };

  post?: Post;
  author?: User;
  parent?: Comment | null;
  replies?: Comment[];
  likes?: Like[];
};

export type Like = {
  id: string;
  createdAt: Date | string;
  userId: string;
  postId?: string | null;
  commentId?: string | null;

  user?: User;
  post?: Post | null;
  comment?: Comment | null;
};

export type Media = {
  id: string;
  url: string;
  type: string;
  createdAt: Date | string;
  userId: string;
  postId?: string | null;

  user?: User;
  post?: Post | null;
};

// Optional: Type guards and utility types
export function isAdmin(user: User): boolean {
  return user.role === ROLE.ADMIN;
}

export function isAuthor(user: User): boolean {
  return user.role === ROLE.AUTHOR;
}
