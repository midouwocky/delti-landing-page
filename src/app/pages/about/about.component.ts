import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  contactEmail = environment.contactEmail;
}
