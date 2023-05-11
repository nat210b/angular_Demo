import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
}
)

export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<UpdatepopupComponent>
  ) { }
  editdata: any
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.rolelist = res;
    })
    if (this.data.usercode != null && this.data.usercode !="") {
      this.service.GetByCode(this.data.usercode).subscribe(res => {
        this.editdata = res
        this.registerform.setValue({
          id: this.editdata.id, name: this.editdata.name,
          email: this.editdata.email, password: this.editdata.password, role: this.editdata.role,
          gender: this.editdata.gender, isactive: this.editdata.isactive
        })
      })
    }else{
      this.toastr.warning('plaese select role')
    }
  }

  rolelist: any

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  })
  UpdateUser() {
    if(this.registerform.valid){
      this.service.UpdateUser(
        this.registerform.value.id,this.registerform.value)
      .subscribe(res=>{
        this.toastr.success('updated')
        this.dialog.close();
        console.log(res)
      })
    }else{
      this.toastr.warning('plaese select role')
    }

  }
}
