import { Component, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Member, editableMember } from 'src/app/types/member';
import { AgePipe } from 'src/app/pipes/age-pipe';
import { MemberService } from 'src/app/_services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, AgePipe, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit, OnDestroy{
  @ViewChild('editForm') editForm?: NgForm;
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService)
  protected memberService = inject(MemberService);
  protected member = signal<Member | undefined>(undefined);
  protected editableMember: editableMember = {
    displayName: this.member()?.displayName || '',
    description: this.member()?.description || '',
    city: this.member()?.city || '',
    country: this.member()?.country || '',
  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data =>{
      this.member.set(data['member']);
    })

    this.editableMember = {
      displayName: this.member()?.displayName || '',
      description: this.member()?.description || '',
      city: this.member()?.city || '',
      country: this.member()?.country || '',
    }
  }

  ngOnDestroy(): void {
    if(this.memberService.editMode()){
    this.memberService.editMode.set(false);
    }
  }

  updateProfile(){
    if(!this.member()) return;

    const updatedMember = {...this.member(), ...this.editableMember}
    console.log(updatedMember);
    this.toast.success('Profile Updated Successfully');
    this.memberService.editMode.set(false);
  }
}
