import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-connect-list',
  templateUrl: './connect-list.component.html',
  styleUrls: ['./connect-list.component.scss']
})
export class ConnectListComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
