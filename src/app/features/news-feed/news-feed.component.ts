import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_services/post.service";
import { Observable } from "rxjs";
import { Post } from "src/app/_models/post";
import { User } from "src/app/_models/user";
import { UsersService } from "src/app/_services/users.service";

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.component.html",
  styleUrls: ["./news-feed.component.scss"]
})
export class NewsFeedComponent implements OnInit {
  items: Post[];
  users: User[];
  connections: User[];
  FilteredArray: User[] = [];
  isSearching = false;
  searchFields = ["People", "Jobs", "Company", "Country"];
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
  filterProducts(inputval) {
    this.FilteredArray = this.userService.filterProducts(inputval);
    if(inputval===''){
      this.isSearching = false;

    }else{

      this.isSearching = true;
    }
  }
  onSearchbyField(i) {
    console.log(i);
    this.FilteredArray = this.userService.ChooseField(i);
  }
}
