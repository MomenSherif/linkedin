import { AuthService } from "./../../../_services/auth.service";
import { UsersService } from "./../../../_services/users.service";
import { CommentService } from "./../../../_services/comment.service";
import { Post } from "./../../../_models/post";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { PostService } from "src/app/_services/post.service";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { User } from "src/app/_models/user";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @ViewChild("commentInput") commentInput;
  currentUser: string;
  items: Observable<any>;
  user: User;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.currentUser = user.uid;
    });
    this.userService.getUserById(this.post.authorId).subscribe(data => {
      this.user = data.payload.data() as User;
    });

    this.getComments(this.post.authorId, this.post.id);
  }

  getComments(userId: string, postId: string) {
    this.postService.getPostComments(userId, postId).subscribe(
      data =>
        (this.post.comments = data.sort((a, b) => {
          if (a.date > b.date) return 1;
          else return -1;
        }))
    );
  }

  checkCommentInput(value) {
    if (value !== "")
      this.addComment(
        this.currentUser,
        this.post.authorId,
        this.post.id,
        value
      );
    this.commentInput.nativeElement.value = "";
  }

  addComment(commentAuthorId, userId, postId, commentCaption) {
    const comment = {
      authorId: commentAuthorId,
      caption: commentCaption,
      date: formatDate(new Date(), "MMM d, y, h:mm:ss a", "en"),
      userLikes: []
    };
    this.commentService.addComment(userId, postId, comment);
  }

  handleLike() {
    if (this.post.userLikes.includes(this.currentUser)) {
      let index = this.post.userLikes.findIndex(el => el === this.currentUser);
      this.post.userLikes.splice(index, 1);
      this.postService.updatePost(this.post.authorId, this.post.id, {
        userLikes: this.post.userLikes
      });
    } else {
      this.post.userLikes.push(this.currentUser);
      this.postService.updatePost(this.post.authorId, this.post.id, {
        userLikes: this.post.userLikes
      });
    }
  }

  deletePost(authorId, postId) {
    this.postService.deletePost(authorId, postId);
  }

  writeComment() {
    this.commentInput.nativeElement.focus();
  }
}
