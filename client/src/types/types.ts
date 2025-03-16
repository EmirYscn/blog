export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLElement>;
export type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

import type {
  User,
  Comment,
  Like,
  Media,
  Post,
  Profile,
} from "../../../shared/types";

import { z } from "zod";

export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  AUTHOR = "AUTHOR",
}

export const RoleEnum = z.nativeEnum(ROLE);
export type Role = z.infer<typeof RoleEnum>;

const baseUserSchema = {
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().nullable(),
  password: z.string().nullable(),
  role: z.nativeEnum(ROLE),
  avatar: z.string().url().nullable(),
};

const baseProfileSchema = {
  id: z.string().uuid(),
  bio: z.string().nullable(),
  userId: z.string().uuid(),
};

const basePostSchema = {
  id: z.string().uuid(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
  title: z.string().max(255),
  content: z.string().nullable(),
  published: z.boolean(),
  authorId: z.string().uuid(),
  tags: z.array(z.string()),
};

const baseCommentSchema = {
  id: z.string().uuid(),
  content: z.string().min(1, "Comment cannot be empty"),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
  parentId: z.string().uuid().nullable(),
};

const baseLikeSchema = {
  id: z.string().uuid(),
  createdAt: z.string().or(z.date()),
  userId: z.string().uuid(),
  postId: z.string().uuid().nullable(),
  commentId: z.string().uuid().nullable(),
};

const baseMediaSchema = {
  id: z.string().uuid(),
  url: z.string().url(),
  type: z.string(),
  createdAt: z.string().or(z.date()),
  userId: z.string().uuid(),
  postId: z.string().uuid().nullable(),
};

export const UserSchema: z.ZodType<User> = z.object({
  ...baseUserSchema,
  profile: z.lazy(() => ProfileSchema).nullable(),
  posts: z.lazy(() => z.array(PostSchema)).default([]),
  comments: z.lazy(() => z.array(CommentSchema)).default([]),
  media: z.lazy(() => z.array(MediaSchema)).default([]),
  likes: z.lazy(() => z.array(LikeSchema)).default([]),
});

export type UserType = z.infer<typeof UserSchema>;

export const ProfileSchema: z.ZodType<Profile> = z.object({
  ...baseProfileSchema,
  user: z.lazy(() => UserSchema),
});

export type ProfileType = z.infer<typeof ProfileSchema>;

export const PostSchema: z.ZodType<Post> = z.object({
  ...basePostSchema,
  author: z.lazy(() => UserSchema).optional(),
  comments: z.lazy(() => z.array(CommentSchema)).default([]),
  media: z.lazy(() => z.array(MediaSchema)).default([]),
  likes: z.lazy(() => z.array(LikeSchema)).default([]),
});

export type PostType = z.infer<typeof PostSchema>;

export const CommentSchema: z.ZodType<Comment> = z.object({
  ...baseCommentSchema,
  post: z.lazy(() => PostSchema),
  author: z.lazy(() => UserSchema),
  parent: z.lazy(() => CommentSchema).nullable(),
  replies: z.lazy(() => z.array(CommentSchema)).default([]),
  likes: z.lazy(() => z.array(LikeSchema)).default([]),
});

export type CommentType = z.infer<typeof CommentSchema>;

export const LikeSchema: z.ZodType<Like> = z.object({
  ...baseLikeSchema,
  user: z.lazy(() => UserSchema),
  post: z.lazy(() => PostSchema).nullable(),
  comment: z.lazy(() => CommentSchema).nullable(),
});

export type LikeType = z.infer<typeof LikeSchema>;

export const MediaSchema: z.ZodType<Media> = z.object({
  ...baseMediaSchema,
  user: z.lazy(() => UserSchema),
  post: z.lazy(() => PostSchema).nullable(),
});

export type MediaType = z.infer<typeof MediaSchema>;

export const ProfileResponseSchema = z.object({
  ...baseProfileSchema,
  user: z
    .object({
      ...baseUserSchema,
      password: z.string().nullable().optional(), // Make password optional
      profile: z
        .lazy(() => ProfileSchema)
        .nullable()
        .optional(), // Break circular reference
      posts: z.lazy(() => z.array(PostSchema)).default([]),
      comments: z.lazy(() => z.array(CommentSchema)).default([]),
      media: z.lazy(() => z.array(MediaSchema)).default([]),
      likes: z.lazy(() => z.array(LikeSchema)).default([]),
    })
    .optional(),
});

// export const ProfileSchema: z.ZodType<Profile> = z.object({
//   id: z.string().uuid(),
//   bio: z.string().nullable(),
//   userId: z.string().uuid(),
//   user: z.lazy(() => UserSchema),
// });

// export type Profile = z.infer<typeof ProfileSchema>;

// export const UserSchema: z.ZodType<User> = z.object({
//   id: z.string().uuid(),
//   email: z.string().email(),
//   username: z.string().nullable(),
//   password: z.string().nullable(),
//   role: RoleEnum.default(ROLE.USER),
//   avatar: z.string().url().nullable(),
//   posts: z.lazy(() => z.array(PostSchema)).default([]),
//   profile: z.lazy(() => ProfileSchema).nullable(),
//   comments: z.lazy(() => z.array(CommentSchema)).default([]),
//   media: z.lazy(() => z.array(MediaSchema)).default([]),
//   likes: z.lazy(() => z.array(LikeSchema)).default([]),
// });

// export type User = z.infer<typeof UserSchema>;

// export const PostSchema: z.ZodType<Post> = z.object({
//   id: z.string().uuid(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   deletedAt: z.date().nullable(),
//   title: z.string().max(255),
//   content: z.string().nullable(),
//   published: z.boolean().default(false),
//   authorId: z.string().uuid(),
//   author: z.lazy(() => UserSchema),
//   comments: z.lazy(() => z.array(CommentSchema)).default([]),
//   tags: z.array(z.string()).default([]),
//   media: z.lazy(() => z.array(MediaSchema)).default([]),
//   likes: z.lazy(() => z.array(LikeSchema)).default([]),
// });

// export type Post = z.infer<typeof PostSchema>;

// export const CommentSchema: z.ZodType<Comment> = z.object({
//   id: z.string().uuid(),
//   content: z.string().min(1, "Comment cannot be empty"),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   postId: z.string().uuid(),
//   post: z.lazy(() => PostSchema),
//   authorId: z.string().uuid(),
//   author: z.lazy(() => UserSchema),
//   parentId: z.string().uuid().nullable(),
//   parent: z.lazy(() => CommentSchema).nullable(),
//   replies: z.lazy(() => z.array(CommentSchema)).default([]),
//   likes: z.lazy(() => z.array(LikeSchema)).default([]),
// });

// export type Comment = z.infer<typeof CommentSchema>;

// export const LikeSchema: z.ZodType<Like> = z.object({
//   id: z.string().uuid(),
//   createdAt: z.date(),
//   userId: z.string().uuid(),
//   user: z.lazy(() => UserSchema),
//   postId: z.string().uuid().nullable(),
//   post: z.lazy(() => PostSchema).nullable(),
//   commentId: z.string().uuid().nullable(),
//   comment: z.lazy(() => CommentSchema).nullable(),
// });

// export type Like = z.infer<typeof LikeSchema>;

// export const MediaSchema: z.ZodType<Media> = z.object({
//   id: z.string().uuid(),
//   url: z.string().url(),
//   type: z.string(),
//   createdAt: z.date(),
//   userId: z.string().uuid(),
//   user: z.lazy(() => UserSchema),
//   postId: z.string().uuid().nullable(),
//   post: z.lazy(() => PostSchema).nullable(),
// });

// export type Media = z.infer<typeof MediaSchema>;
