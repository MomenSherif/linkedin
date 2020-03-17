import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  FilteredArray: User[] = [];
  isSearching = false;
  constructor(private userService: UsersService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // if (this.activateRoute.params) {
    //   this.activateRoute.params.subscribe((params) => {
    //     console.log(params);
    //     const inputValname = params.name;
    //     const inputValLocation = params.location;
    //     this.userService.inputval = inputValname;
    //     this.onSearchbyField(1);
    //   });

    // }
  }
  filterProducts(inputval) {
    this.FilteredArray = this.userService.filterProducts(inputval);
    this.isSearching = true;
  }
  onSearchbyField(i) {
    this.FilteredArray = this.userService.ChooseField(i);
  }
}
