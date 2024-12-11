import { CommentType } from './comments.type';
import { UserType } from './users.type';


export enum PostCategory {
  userPost = "post utilisateur",
  news = 'Actualités',
  pub = 'publicité',
}
export type PostType = {
  id?: string;
  title?: string;
  content: string;
  media?: string;
  postedAt: Date;
  author: UserType;
  likes?: Array<UserType>;
  comments?: Array<CommentType>;
  category: PostCategory;
};