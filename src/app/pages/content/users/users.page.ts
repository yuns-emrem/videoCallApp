import { Component, OnInit } from '@angular/core';
import { QuerySnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  private readonly authService: AuthService;
  private readonly userService: UserService;
  private readonly router: Router;

  users: User[] = [];
  lastDate = null;


  constructor(
    authService: AuthService,
    userService: UserService,
    router: Router,
  ) {
    this.router = router;
    this.authService = authService;
    this.userService = userService;

  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(event?: any) {

    this.userService.getUsers(this.lastDate).then(res => {
      if (res) {
        console.log('res lenght', res.length);
        if (res.length < 25) {
          if (event) event.target.disabled = true;
        }
        this.lastDate = res[res.length - 1].registerDate;
        this.users.push(...res)
      }

      if (event) event.target.complete();
    })
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }


  loadData(event) {
    console.log('event', event);
    if (event == null) {
      // this.lastDate = null;
      // event.target.disabled = true;
      return;
    }
    console.log('event', event);
    this.getAllUsers(event);

  }
}
