import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../../services/user-service'
@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo implements OnInit {

  user: any = {};

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.profile$.subscribe((res: any) => {
      if (res) {
        this.user = res;
        
setTimeout(() => {
        this.cdr.detectChanges();   // ✅ fixes NG0100
      });
      }
    });

    this.userService.getProfile();
  }
}

