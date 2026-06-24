import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-cart-component',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit{
  cartItems:any[]=[];
  total=0;
  constructor(private auth:AuthService){}
  ngOnInit(){
    this.loadCart();
  }
  loadCart(){
    this.auth.getCart().subscribe((res:any)=>{
      this.cartItems=[...res];
      this.calculateTotal();
    });
  }
  calculateTotal(){
    this.total=0;
    for(let item of this.cartItems){
      this.total += item.menu.price * item.quantity;
    }
  }
  removeItem(id:number){
    this.auth.removeFromCart(id).subscribe(()=>this.loadCart());
  }
}