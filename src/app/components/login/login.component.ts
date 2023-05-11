import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private builder:FormBuilder,
    private toastr:ToastrService,
    private service:AuthService,
    private router:Router,
    ) {
      sessionStorage.clear();
    }

    userdata:any

    loginform=this.builder.group({
      username:this.builder.control('',Validators.required),
      password:this.builder.control('',Validators.required),
    })
    proceedlogin(){
      // if(this.loginform.valid){
      //   this.service.ProceedRegister(this.loginform.value).subscribe(res=>{
      //     this.toastr.success('contact admin','registered ')
      //     this.router.navigate(['login'])
      //   })
      // }else{
      //   this.toastr.warning("plase enter data")
  
      // }
    this.service.GetByCode(this.loginform.value.username).subscribe(res=>{
      this.userdata=res;
      console.log(this.userdata)
      if(this.userdata.password===this.loginform.value.password){
        if(this.userdata.isactive){
          sessionStorage.setItem('username',this.userdata.id);
          sessionStorage.setItem('userrole',this.userdata.role);
          this.router.navigate(['/'])
        }else{
          this.toastr.error('contactAdmin')
        }
      }else{
        this.toastr.error('invalid')
      }
    })
    }

}
