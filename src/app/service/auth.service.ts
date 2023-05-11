import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient){}
  apiurl='http://localhost:3000/user'

  GetAll(){
    return this.http.get(this.apiurl);
  }
  GetByCode(code:any){
    return this.http.get(this.apiurl+'/'+code);
  }
  GetAllRole(){
    return this.http.get("http://localhost:3000/role");
  }
  ProceedRegister(inputdata:any){
    return this.http.post(this.apiurl,inputdata);
  }
  UpdateUser(code:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+code,inputdata);
  }

  IsloggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  GetUserrole(){
    return sessionStorage
    .getItem('userrole')!=null?sessionStorage
    .getItem('userrole')?.toString():'';
  }
}
