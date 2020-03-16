import { UsersService } from "src/app/_services/users.service";

import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_services/post.service";
import { Observable } from "rxjs";
import { Post } from "src/app/_models/post";
import { User } from "src/app/_models/user";

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.component.html",
  styleUrls: ["./news-feed.component.scss"]
})
export class NewsFeedComponent implements OnInit {
  items: Post[];
  users: User[];
  connections: User[];
  constructor(
    private postService: PostService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      data =>
        (this.items = data.sort((a, b) => {
          if (a.date < b.date) return 1;
          else return -1;
        }))
    );

    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as User)
        } as User;
      });
      this.connections = this.users.splice(1, 4);
    });
  }
}
