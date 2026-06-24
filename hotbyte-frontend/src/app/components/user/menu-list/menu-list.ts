import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
@Component({
  selector: 'app-menu-list',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css',
})
export class MenuList implements OnInit{
  menuList:any[]=[];
  constructor(private auth:AuthService){}
  ngOnInit(){
    this.loadMenu();
  }
  loadMenu(){
    this.auth.getAllMenu().subscribe((res:any)=>{
      this.menuList=[...res];
    });
  }
  addToCart(id:number){
    this.auth.addToCart(id).subscribe(()=>alert("Added ✅"));
  }
}