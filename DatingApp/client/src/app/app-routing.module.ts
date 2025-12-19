import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { authGuard } from './guard/auth.guard';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MemberPhotosComponent } from './members/member-photos/member-photos.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { memberResolver } from './features/member/member-resolver';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', runGuardsAndResolvers: 'always', canActivate: [authGuard], children: [
    {path: 'members', component: MemberListComponent},
    {path: 'members/:id',
    resolve: {member: memberResolver},
    runGuardsAndResolvers: 'always', 
    component: MemberDetailComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: MemberProfileComponent, title: 'Profile'},
      {path: 'photos', component: MemberPhotosComponent, title: 'Photos'},
      {path: 'messages', component: MemberMessagesComponent, title: 'Messages'},
    ]
  },
    {path: 'lists', component: ListsComponent},
    {path: 'messages', component: MessagesComponent},
  ]},
 
  {path: '**', component: HomeComponent, pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
