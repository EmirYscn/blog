export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type {
  ROLE,
  User,
  Comment,
  Like,
  Media,
  Post,
  Profile,
  isAdmin,
  isAuthor,
} from "../../../shared/types";
