import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserItemComponent } from 'src/app/core/components/user-item/user-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule
  ],
  providers:[
    AuthService
  ],
  declarations: [UsersPage,UserItemComponent]
})
export class UsersPageModule {}
