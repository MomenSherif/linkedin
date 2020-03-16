export interface Post {
  id?: string;
  authorId?: string;
  caption?: string;
  date?: Date;
  userLikes?: string[];
  comments?;
}
