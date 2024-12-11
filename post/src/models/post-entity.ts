import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostCategory } from './post.type';
import { UserType } from './users.type';
import { CommentType } from './comments.type';


export enum Role{
    userPost = "post utilisateur",
    news = 'Actualités',
    pub = 'publicité',
  }
@Entity({
  name: 'post',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 75 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  media: string;

  @Column()
  category: PostCategory;

  @Column()
  postedAt: Date;

  @Column()
  authorId: string;

  @Column({ type: 'json' })
  likes: UserType[];

  @Column({ type: 'json' })
  comments: CommentType[];
}