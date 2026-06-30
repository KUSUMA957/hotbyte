import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-scroll-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-scroll-component.html',
  styleUrl: './category-scroll-component.css',
})
export class CategoryScrollComponent {
  
defaultImage =
  'https://i.pinimg.com/originals/1f/61/15/1f6115deda19c4c5ae2200ff54b82fae.jpg';

  @Input() categories: string[] = [];
  @Input() selectedCategory = 'All';

  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(cat: string) {
    this.categorySelected.emit(cat);
  }
  
setDefaultImage(event: any) {
  event.target.src = this.defaultImage;
}

 getCategoryImage(category: string): string {

  const normalized = category.toLowerCase();

  const map: any = {
    'starter': 'starter.png',
    'starters': 'starter.png',
    'dessert': 'desserts.png',
    'desserts': 'desserts.png'
  };

  const fileName = map[normalized] || normalized.replace(/\s+/g, '-') + '.png';

  return '/assets/categories/' + fileName;
}
}
