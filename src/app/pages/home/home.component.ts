import { Component,PLATFORM_ID, Inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinksComponent } from '../../components/links/links.component';
import { TranslateModule } from '@ngx-translate/core';
declare var initWow: any;

@Component({
  selector: 'app-home',
  imports: [RouterModule, LinksComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initWow();
  }
}
