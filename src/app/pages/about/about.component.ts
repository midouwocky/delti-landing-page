import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LinksComponent } from '../../components/links/links.component';

@Component({
  selector: 'app-about',
  imports: [TranslateModule, LinksComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  contactEmail = environment.contactEmail;
}
