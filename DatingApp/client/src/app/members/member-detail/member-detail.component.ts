import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/_services/member-service';
import { Member } from 'src/app/types/member';
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css'],
    imports: [AsyncPipe, RouterLink, RouterLinkActive]
})
export class MemberDetailComponent implements OnInit{
    private memberService = inject(MemberService);
    private route = inject(ActivatedRoute);
    protected member$?: Observable<Member>

    ngOnInit(): void {
        this.member$ = this.loadMember();
    }

    loadMember(){
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;
        return this.memberService.getMember(id);
    }
}
