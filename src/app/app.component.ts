import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Delti Solution';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.addLangs(['en', 'fr', 'ar']);
    this.translate.setDefaultLang('ar');

    let preferredLang = 'ar';
    if (isPlatformBrowser(this.platformId)) {
      preferredLang = localStorage.getItem('preferredLanguage') || 'ar';
    }
    
    this.translate.use(preferredLang);
    this.updateDirection(preferredLang);

    this.translate.onLangChange.subscribe(event => {
      this.updateDirection(event.lang);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('preferredLanguage', event.lang);
      }
    });
  }

  private updateDirection(lang: string): void {
    this.document.documentElement.lang = lang;
    if (lang === 'ar') {
      this.document.documentElement.dir = 'rtl';
    } else {
      this.document.documentElement.dir = 'ltr';
    }
  }
}
