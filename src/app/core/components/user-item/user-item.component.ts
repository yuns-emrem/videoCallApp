import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

  @Input()
  public user: User = null;

  @Output()
  callEvent = new EventEmitter<User>();
  
  constructor() { }

  ngOnInit() {}

  callUserEventEmitter(user: User) {
    this.callEvent.emit(user);
  }

}
