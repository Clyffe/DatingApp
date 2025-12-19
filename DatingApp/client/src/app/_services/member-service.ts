import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Member } from "../types/member";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MemberService{
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getMembers(){
        return this.http.get<Member []>(this.baseUrl + 'members/')
    }

    getMember(id: string){
        return this.http.get<Member>(this.baseUrl + 'members/' + id);
    }

}
