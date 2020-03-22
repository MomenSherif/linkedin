import { UsersService } from "./../../../_services/users.service";
import { PostService } from "src/app/_services/post.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { formatDate } from "@angular/common";
import { AuthService } from "src/app/_services/auth.service";
import { User } from "src/app/_models/user";
import { ActivatedRoute } from "@angular/router";

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
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.currentUser = id ? id : this.authService.currentUser;
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
