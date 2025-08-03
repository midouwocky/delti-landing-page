import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,   
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  imagePath = '';

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  constructor(public translate: TranslateService ) {
    this.translate.onLangChange.subscribe(event => {
      this.imagePath = 'images/logo-delti-200x59.png';
      if (this.translate.currentLang === 'ar') {
        this.imagePath = 'images/logo-delti-ar.png';
      }
    });
  }
}
