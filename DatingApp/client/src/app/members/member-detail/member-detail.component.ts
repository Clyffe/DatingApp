import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { Member } from 'src/app/types/member';
import { AgePipe } from 'src/app/pipes/age-pipe';
@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css'],
    imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe]
})
export class MemberDetailComponent implements OnInit{
    private route = inject(ActivatedRoute);
    private router = inject(Router)
    protected member = signal<Member | undefined>(undefined);
    protected title = signal<string | undefined>('Profile');

    ngOnInit(): void {
        this.route.data.subscribe({
            next: data => this.member.set(data['member'])
        })
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
