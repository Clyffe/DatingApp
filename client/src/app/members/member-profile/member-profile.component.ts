import { Component, HostListener, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Member, editableMember } from 'src/app/types/member';
import { AgePipe } from 'src/app/pipes/age-pipe';
import { MemberService } from 'src/app/_services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast-service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, AgePipe, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit, OnDestroy{
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent){
    if(this.editForm?.dirty){
      $event.preventDefault();
    }
  }
  private accountService = inject(AccountService);
  private toast = inject(ToastService)
  protected memberService = inject(MemberService);
  protected editableMember: editableMember = {
    displayName: '',
    description: '',
    city: '',
    country: '',
  }

  ngOnInit(): void {

    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
    }
  }

  ngOnDestroy(): void {
    if(this.memberService.editMode()){
    this.memberService.editMode.set(false);
    }
  }

  updateProfile(){
    if(!this.memberService.member()) return;

    const updatedMember = {...this.memberService.member(), ...this.editableMember}
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser && updatedMember.displayName !== currentUser?.displayName){
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser)
        }
        this.toast.success('Profile Updated Successfully');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updatedMember as Member)
        this.editForm?.reset(updatedMember);
      }
    })
    
  }
}
