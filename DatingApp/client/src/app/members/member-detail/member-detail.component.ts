import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { Member } from 'src/app/types/member';
import { AgePipe } from 'src/app/pipes/age-pipe';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member-service';
@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css'],
    imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe]
})
export class MemberDetailComponent implements OnInit{
    private route = inject(ActivatedRoute);
    private router = inject(Router)
    protected memberService = inject(MemberService);
    private accountService = inject(AccountService);
    protected member = signal<Member | undefined>(undefined);
    protected title = signal<string | undefined>('Profile');
    protected isCurrentUser = computed(() => {
        return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
    })

    ngOnInit(): void {

        this.title.set(this.route.firstChild?.snapshot?.title)

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe({
            next: () => {
                this.title.set(this.route.firstChild?.snapshot?.title)
            }
        })
    }
}
