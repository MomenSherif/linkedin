import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  FilteredArray: User[] = [];
  isSearching = false;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }
  filterProducts(inputval) {
    this.FilteredArray = this.userService.filterProducts(inputval);
    this.isSearching = true;
  }
  onSearchbyField(i) {
    console.log(i);
    this.FilteredArray = this.userService.ChooseField(i);
  }
}
