import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/_services/member-service';
import { Photo } from 'src/app/types/member';
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe, ImageUploadComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit {
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);

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
}
