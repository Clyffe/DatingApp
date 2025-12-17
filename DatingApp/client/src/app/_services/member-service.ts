import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { Member } from "../types/member";
import { AccountService } from "./account.service";

@Injectable({
    providedIn: 'root'
})
export class MemberService{
    private http = inject(HttpClient);
    private accountService = inject(AccountService)
    private baseUrl = environment.apiUrl

    getMembers(){
        return this.http.get<Member []>(this.baseUrl + 'members', this.getHttpOptions())
    }

    getMember(id: string){
        return this.http.get<Member>(this.baseUrl + 'members/' + id, this.getHttpOptions());
    }

    private getHttpOptions(){
        return {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.accountService.currentUser()?.token
            })
        }
    }
}
