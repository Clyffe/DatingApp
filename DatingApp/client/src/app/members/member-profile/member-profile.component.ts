import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/types/member';
import { AgePipe } from 'src/app/pipes/age-pipe';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, AgePipe],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit{

  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data =>{
      this.member.set(data['member']);
    })
  }
}
