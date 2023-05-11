import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,Validator, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr"
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private builder:FormBuilder,
    private toastr:ToastrService,
    private service:AuthService,
    private router:Router,
    ) { }
  ngOnInit(): void { }
  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required,
      //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&][A-Za-z\d$@$!%*?&].{8,})')
    ])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('male'),
    role:this.builder.control('',),
    isactive:this.builder.control(false),
  })
  proceedregistration(){
    if(this.registerform.valid){
      this.service.ProceedRegister(this.registerform.value).subscribe(res=>{
        this.toastr.success('contact admin','registered ')
        this.router.navigate(['login'])
      })
    }else{
      this.toastr.warning("plase enter data")

    }
  }

}