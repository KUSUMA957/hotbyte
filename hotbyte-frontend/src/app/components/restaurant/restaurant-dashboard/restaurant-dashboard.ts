import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant-service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-restaurant-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './restaurant-dashboard.html',
  styleUrl: './restaurant-dashboard.css',
})
export class RestaurantDashboard implements OnInit {

  menuList: any[] = [];
  showModal = false;
  isEdit = false;
  viewMode = false;
  showProfile = false;
  showProfileModal = false;
  profileData: any = {};
  formData: any = {};

  restaurantName = localStorage.getItem('restaurantName') || 'Restaurant';
  ownerName = localStorage.getItem('name') || 'User';
  @HostListener('document:click', ['$event'])
onDocumentClick(event: any) {
  const clickedInside = event.target.closest('.profile-box') || event.target.closest('.profile');

  if (!clickedInside) {
    this.showProfile = false; 
  }
}
  constructor(private service: RestaurantService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMenu();
  }

 loadMenu() {
  this.service.getMenu().subscribe({
    next: (res) => {
      
 console.log("MENU ✅:", res);
      this.menuList = res ? [...res] : [];
      this.cd.detectChanges();
},
    error: () => {
      this.menuList = [];
    }
  });
}

  openAdd() {
    this.viewMode = false;
    this.isEdit = false;

    this.formData = {
      itemName: '',
      description: '',
      price: '',
      category: '',
      type: '',
      calories: '',
      rating: '',
      servingSize: '',
      nutritionalInfo: '',
      available: true
    };

    this.showModal = true;
  }

  openEdit(item: any) {
    this.viewMode = false;
    this.isEdit = true;

    this.formData = { ...item };

    this.showModal = true;
  }

 openProfileEdit() {
  this.service.getProfile().subscribe({
    next: (res) => {
      console.log("PROFILE ✅", res);

      this.profileData = res;   // ✅ full DB data
      this.showProfileModal = true;
    },
    error: (err) => {
      console.log("PROFILE ERROR ❌", err);
      alert("Failed to load profile");
    }
  });
}
  openView(item: any) {
    this.viewMode = true;
    this.isEdit = false;
    this.formData = item;
    this.showModal = true;
  }

  save() {

    if (!this.formData.itemName || !this.formData.price) {
      alert('Item Name and Price are required');
      return;
    }

    const toNumber = (val: any) => {
      const n = Number(val);
      return isNaN(n) ? 0 : n;
    };

    const cleanStr = (val: any) => {
      return val && val.trim() !== '' ? val.trim() : null;
    };

    const payload = {
      itemName: cleanStr(this.formData.itemName),
      description: cleanStr(this.formData.description),
      price: toNumber(this.formData.price),
      category: cleanStr(this.formData.category),
      type: cleanStr(this.formData.type),
      calories: toNumber(this.formData.calories),
      rating: toNumber(this.formData.rating),
      available: this.formData.available !== false,
      servingSize: cleanStr(this.formData.servingSize),
      nutritionalInfo: cleanStr(this.formData.nutritionalInfo)
    };

    console.log("FINAL PAYLOAD ✅", payload);

    if (this.isEdit) {
      this.service.updateMenu(this.formData.id, payload).subscribe({
        next: () => {
          this.close();
          this.loadMenu();
        },
        error: (err) => {
          console.log("UPDATE ERROR ❌", err);
          alert(err.error?.message || 'Update Failed');
        }
      });
    } else {
      this.service.addMenu(payload).subscribe({
        next: () => {
          
 this.showModal = false;    
  this.viewMode = false;
  this.loadMenu();

          this.loadMenu();
        },
        error: (err) => {
          console.log("ADD ERROR ❌", err);
          alert(err.error?.message || 'Add Failed');
        }
      });
    }
  }

  delete(id: number) {
    if (confirm('Delete this item?')) {
      this.service.deleteMenu(id).subscribe(() => {
        this.loadMenu();
      });
    }
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  close() {
    this.showModal = false;
    this.viewMode = false;
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
  saveProfile() {

  const payload = {
    restaurantName: this.profileData.restaurantName,
    location: this.profileData.location,
    name: this.profileData.name,
    phone: this.profileData.phone,
    address: this.profileData.address,
    gender: this.profileData.gender
  };

  this.service.updateProfile(payload).subscribe({
    next: () => {
      alert('Profile Updated ✅');

      // ✅ update UI instantly
      this.restaurantName = payload.restaurantName;
      this.ownerName = payload.name;

      // ✅ persist data
      localStorage.setItem('restaurantName', payload.restaurantName);
      localStorage.setItem('name', payload.name);

      // ✅ close modal
      this.showProfileModal = false;
      this.showProfile = false;
    },
    error: () => {
      alert('Update Failed ❌');
    }
  });
}

}