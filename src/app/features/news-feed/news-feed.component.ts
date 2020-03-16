import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_services/post.service";
import { Observable } from "rxjs";
import { Post } from "src/app/_models/post";

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.component.html",
  styleUrls: ["./news-feed.component.scss"]
})
export class NewsFeedComponent implements OnInit {
  items: Post[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      data =>
        (this.items = data.sort((a, b) => {
          if (a.date < b.date) return 1;
          else return -1;
        }))
    );
  }
}
