import { Component, OnInit, inject, signal } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../types/user';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../_services/toast-service';
import { themes } from '../layout/theme';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    imports: [RouterLink, RouterLinkActive, FormsModule]
})
export class NavComponent  implements OnInit{

  protected loggedIn = signal(false)
  model: any = {}
  private router = inject(Router)
  private toastr = inject(ToastService)
  protected  selectedTheme = signal<string>(localStorage.getItem('theme') || 'light')
  protected themes =  themes;

  protected accountService = inject(AccountService)

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }


  //HTTP Requests complete, and thus don't need to be unsubscribed
  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
        this.loggedIn.set(true);
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
    this.loggedIn.set(false);

  }

  handleSelectTheme(theme: string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
