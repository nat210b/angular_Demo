import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export class Book{
  name:string='';
  price:string='';
  description:string='';
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //node / express API
  REST_API: String='http://localhost:8000/api';
  //http header
  httpHeaders = new HttpHeaders().set('Content-type','application/json');
  constructor(private httpClient:HttpClient ) { }

  //add
  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  
//get all obj
  GetBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }
  //get 1 book
  GetBook(id:any):Observable<any>{
    let API_URL=`${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders})
    .pipe(map((res:any)=>{
      return res||{}
    }),catchError(this.handleError))
  }
  //update 
  updateBook(id: any, data:any['']): Observable<any> {
    return this.httpClient.put(`${this.REST_API}/update/${id}`, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  // updateBook (id:any,data:any):Observable<any>{
  //   let API_URL=`${this.REST_API}/update-book/${id}`;
  //   return this.httpClient.put(API_URL,{headers:this.httpHeaders})
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  // }
  DeleteBook (id:any):Observable<any>{
    let API_URL=`${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }


  handleError(error:HttpErrorResponse){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      //handle client Error
      errorMessage=error.error.message;
    }else{
      //handle server Error
      errorMessage='Error Code: ${error.status}\nMessage: ${error.message}';
    }
    return errorMessage;
  }
}
