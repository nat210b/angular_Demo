import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient}from '@angular/common/http';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent {
  title = 'uploadfile';
  @ViewChild('sigleInput',{static:false})singleInput!:ElementRef;
  images:any;
  constructor(private http:HttpClient){

  }
  selectImage(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0]
      console.log(file)
      this.images=file
    }

  }
  onSubmit(){
    //constriuc
    const formdata = new FormData()
    formdata.append('file',this.images)
    //post req to express 
   this.http.post<any>("http://localhost:8000/file",formdata)
   .subscribe((res)=>{
    console.log(res)
   })
  }

}
