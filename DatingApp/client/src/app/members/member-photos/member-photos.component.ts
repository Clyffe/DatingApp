import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/_services/member-service';
import { Photo } from 'src/app/types/member';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);

  protected photos$?: Observable<Photo[]>;

  constructor(){
    const memberId = this.route.parent?.snapshot?.paramMap.get('id');
    if(memberId){
      this.photos$ = this.memberService.getMemberPhotos(memberId);
    }
  }
}
