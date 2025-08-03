import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    ClickOutsideDirective,
    FontAwesomeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  imagePath = '';
  faBars = faBars;

  constructor(public translate: TranslateService) {
    this.translate.onLangChange.subscribe((event) => {
      this.imagePath = 'images/logo-delti-200x59.png';
      if (this.translate.currentLang === 'ar') {
        this.imagePath = 'images/logo-delti-ar.png';
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
