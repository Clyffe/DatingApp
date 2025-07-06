import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent  implements OnInit{

  model: any = {}
  private router = inject(Router)
  private toastr = inject(ToastrService)

  constructor(public accountService: AccountService){}
  ngOnInit(): void {
  }


  //HTTP Requests complete, and thus don't need to be unsubscribed
  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')

  }
}
