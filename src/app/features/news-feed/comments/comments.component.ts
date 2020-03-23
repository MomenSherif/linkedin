import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../../_services/auth.service";
import { UsersService } from "./../../../_services/users.service";
import { CommentService } from "./../../../_services/comment.service";
import { Comment } from "./../../../_models/comment";
import { Component, OnInit, Input } from "@angular/core";
import { formatDate } from "@angular/common";
import { User } from "src/app/_models/user";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() comment: Comment;
  @Input() postAuthorId: string;
  @Input() postId: string;
  user: User;
  currentUser;

  constructor(
    private commentService: CommentService,
    private userService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.currentUser = id ? id : this.authService.currentUser;
    });
    this.userService.getUserById(this.comment.authorId).subscribe(data => {
      this.user = data.payload.data() as User;
    });
  }

  handleLikeComment() {
    if (this.comment.userLikes.includes(this.currentUser)) {
      let index = this.comment.userLikes.findIndex(
        el => el === this.currentUser
      );
      this.comment.userLikes.splice(index, 1);
      this.commentService.updateComment(
        this.postAuthorId,
        this.postId,
        this.comment.id,
        {
          userLikes: this.comment.userLikes
        }
      );
    } else {
      this.comment.userLikes.push(this.currentUser);
      this.commentService.updateComment(
        this.postAuthorId,
        this.postId,
        this.comment.id,
        {
          userLikes: this.comment.userLikes
        }
      );
    }
  }

  deleteComment(postAuthorId, postId, commentId) {
    this.commentService.deletePost(postAuthorId, postId, commentId);
  }
}
