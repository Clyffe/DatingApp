import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavComponent, RouterOutlet]
})
export class AppComponent{
  title = 'Dating App';

  constructor(private accountService: AccountService){}
}
