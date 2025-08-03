import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LinksComponent } from '../../components/links/links.component';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [TranslateModule, CommonModule, LinksComponent],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent {
  lastUpdatedDate =  new Date('2025-08-03');
  contactEmail = environment.contactEmail;
}
