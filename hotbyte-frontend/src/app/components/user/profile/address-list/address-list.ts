import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../services/user-service';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-list.html',
  styleUrl: './address-list.css',
})
export class AddressList implements OnInit {
  showForm = false;

form: any = {
  label: '',
  addressLine: '',
  city: '',
  pincode: ''
};
editingId: number | null = null;

editAddress(addr: any) {
  this.form = { ...addr };
  this.editingId = addr.id;
  this.showForm = true;
}

  addresses: any[] = [];
  baseUrl = 'http://localhost:5489/api/user/address';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  // ✅ Fetch all addresses
  loadAddresses() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (res) => {
        console.log("API RESPONSE:", res);
        this.addresses = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching addresses', err);
      }
    });
  }

  // ✅ Select address
  selectAddress(id: number) {
    this.http.put(`${this.baseUrl}/select/${id}`, {}).subscribe({
      next: () => {
        console.log('Address selected ✅');

        this.loadAddresses();         // refresh list
        this.userService.getProfile(); // ✅ update header
        
 setTimeout(() => {
        this.cdr.detectChanges(); // ✅ ensures UI refresh
      });

      },
      error: (err) => {
        console.error('Error selecting address', err);
      }
    });
  }

  // ✅ Delete address
  deleteAddress(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        console.log('Address deleted ✅');
        this.loadAddresses();
      },
      error: (err) => {
        console.error('Error deleting address', err);
        
      // ✅ HANDLE CONSTRAINT ERROR
      if (err.status === 400 &&
          err.error?.message?.toLowerCase().includes('constraint')) {

        alert("⚠️ Cannot delete this address. It is used in orders.");
      } else {
        alert("❌ Failed to delete address");
      }

      }
    });
  }

  toggleForm() {
  this.showForm = !this.showForm;
}

saveAddress() {

  if (this.editingId) {

    this.http.put(`${this.baseUrl}/${this.editingId}`, this.form)
      .subscribe(() => {

        console.log("Updated ✅");

        this.resetForm();
        this.loadAddresses();
      });

  } else {

    this.http.post(this.baseUrl, this.form).subscribe(() => {
      console.log("Added ✅");
      this.resetForm();
      this.loadAddresses();
    });
  }
}

resetForm() {
  this.form = {};
  this.editingId = null;
  this.showForm = false;

  this.cdr.detectChanges();
}
}
