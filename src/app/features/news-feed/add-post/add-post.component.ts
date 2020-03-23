import { UsersService } from "./../../../_services/users.service";
import { PostService } from "src/app/_services/post.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { formatDate } from "@angular/common";
import { AuthService } from "src/app/_services/auth.service";
import { User } from "src/app/_models/user";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.scss"]
})
export class AddPostComponent implements OnInit {
  @ViewChild("textArea") txt;
  isPostingvalid = false;
  startPost = false;
  currentUser: string;
  user: User;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.currentUser = user.uid;
      this.userService.getUserById(this.currentUser).subscribe(data => {
        this.user = data.payload.data() as User;
      });
    });
  }

  captionInput(e) {
    e.target.value !== ""
      ? (this.isPostingvalid = true)
      : (this.isPostingvalid = false);
    // console.log("from caption input", e.target.value);
  }

  AddPost(value) {
    let newPost = {
      authorId: this.currentUser,
      caption: value,
      date: formatDate(new Date(), "MMM d, y, h:mm:ss a", "en"),
      userLikes: []
    };
    this.postService.addPost(this.currentUser, newPost);
    this.startPost = false;
    this.txt.nativeElement.value = "";
    console.log("from addpost input", value);
  }
}
