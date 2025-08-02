import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinksComponent } from '../../components/links/links.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [RouterModule, LinksComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
