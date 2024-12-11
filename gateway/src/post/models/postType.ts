import { UserType } from 'src/users/model/user.type';
import { CommentType } from './commentType';




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