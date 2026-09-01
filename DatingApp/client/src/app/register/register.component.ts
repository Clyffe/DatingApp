import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../_services/toast-service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {}
  private toastr = inject(ToastService)
  private accountService = inject(AccountService)
  protected registerForm: FormGroup = new FormGroup({});

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
