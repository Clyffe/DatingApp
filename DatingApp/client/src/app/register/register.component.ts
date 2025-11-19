import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../_services/toast-service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [FormsModule]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {}
  private toastr = inject(ToastService)

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
