import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-menu-component',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './add-menu-component.html',
  styleUrl: './add-menu-component.css',
})
export class AddMenuComponent{
  formData:any={
    itemName:'',
    description:'',
    price:'',
    category:'',
  };
  constructor(private auth:AuthService, private router:Router){}
  submit(){
    this.auth.addMenu(this.formData).subscribe(()=>{
      this.router.navigate(['/restaurant']);
    });
  }
}
