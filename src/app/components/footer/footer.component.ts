import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  languages = ['en', 'fr', 'ar'];
  isLanguageSelectorOpen = false;

  constructor(public translate: TranslateService) {}

  toggleLanguageSelector(): void {
    this.isLanguageSelectorOpen = !this.isLanguageSelectorOpen;
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.isLanguageSelectorOpen = false;
  }
}
