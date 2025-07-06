import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {}
  private toastr = inject(ToastrService)

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response =>{
        this.cancel();
      },

      error: error => this.toastr.error(error.error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
