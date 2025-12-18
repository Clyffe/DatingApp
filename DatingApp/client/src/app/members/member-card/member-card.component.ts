import { Component, input } from '@angular/core';
import { Member } from 'src/app/types/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
  imports: [RouterLink]
})
export class MemberCardComponent {
  public member = input.required<Member>();


}
