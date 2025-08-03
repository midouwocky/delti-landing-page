import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinksComponent } from '../../components/links/links.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

declare var initWow: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, LinksComponent, TranslateModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  constructor(public translate: TranslateService) {}

  ngAfterViewInit(): void {
    initWow();
  }
}
