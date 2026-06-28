import { Component } from '@angular/core';
import { UserInfo } from '../user-info/user-info'
import { CommonModule } from '@angular/common';
import { AddressList } from '../address-list/address-list'
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserInfo, CommonModule, AddressList],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class UserProfileComponent {}
