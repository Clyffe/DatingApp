import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/_services/member-service';
import { Member, Photo } from 'src/app/types/member';
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-member-photos',
  imports: [ ImageUploadComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit {
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService)
  protected photos = signal<Photo[]>([])
  protected loading = signal(false);


  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot?.paramMap.get('id');
    if(memberId){
      this.memberService.getMemberPhotos(memberId).subscribe(
        {next: photos => this.photos.set(photos)}
      )
    }
  }

  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: photo => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos => [...photos, photo]);
      },
      error: error => {
        console.log('Error Uploading Image ', error)
        this.loading.set(false)
      }
    })
  }

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser(); 
        console.log(currentUser);
        if (currentUser) currentUser.imageURL = photo.url;
        this.accountService.setCurrentUser(currentUser as User);
        this.memberService.member.update(member => ({
          ...member,
          imageURL: photo.url
        }) as Member)
      }
    })
  }
}
