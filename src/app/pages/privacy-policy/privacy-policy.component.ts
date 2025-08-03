import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LinksComponent } from '../../components/links/links.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [ TranslateModule, CommonModule, LinksComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
  lastUpdatedDate = environment.lastUpdatedDate;
  contactEmail = environment.contactEmail;
}
