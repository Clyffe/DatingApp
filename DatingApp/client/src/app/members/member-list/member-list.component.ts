import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/_services/member-service';
import { Member } from 'src/app/types/member';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css'],
    imports: [AsyncPipe],
})
export class MemberListComponent {
    private memberService = inject(MemberService);
    protected members$: Observable<Member[]>;

    constructor(){
        this.members$ = this.memberService.getMembers();
    }
}
