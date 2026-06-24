import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurant-dashboard',
  standalone:true,
  imports:[CommonModule,RouterModule],
  templateUrl: './restaurant-dashboard.html',
  styleUrl: './restaurant-dashboard.css',
})
export class RestaurantDashboard implements OnInit{
  menuList:any[]=[];
  constructor(private auth:AuthService){}
  ngOnInit(){
    this.loadMenu();
  }
  loadMenu(){
    this.auth.getRestaurantMenu().subscribe((res:any)=>{
      this.menuList=[...res];
    });
  }
  delete(id:number){
    this.auth.deleteMenu(id).subscribe(()=>this.loadMenu());
  }
  logout() { this.auth.logout(); }

}