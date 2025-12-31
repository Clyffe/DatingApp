import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Member, Photo, editableMember } from "../types/member";
import { environment } from "src/environments/environment";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MemberService{
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;
    public editMode = signal(false);
    member = signal<Member | null>(null);

    getMembers(){
        return this.http.get<Member []>(this.baseUrl + 'members/')
    }

    getMember(id: string){
        return this.http.get<Member>(this.baseUrl + 'members/' + id).pipe(
            tap(member => {
                this.member.set(member)
            })
        );
    }

    getMemberPhotos(id: string){
        return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
    }
    updateMember(member: editableMember){
        return this.http.put(this.baseUrl + 'members', member)
    }

    uploadPhoto(file: File){
        const formData = new FormData;
        formData.append('file', file);
        return this.http.post<Photo>(this.baseUrl + 'members/add-photo', formData)
    }
}
