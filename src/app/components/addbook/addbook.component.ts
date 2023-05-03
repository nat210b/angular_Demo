import { Component,OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {CrudService } from 'src/app/service/crud.service';
import {Validators,FormBuilder,FormControl, NgModel, NgModelGroup} from '@angular/forms'

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})

export class AddbookComponent implements OnInit {
  book={name:'',price:'',description:''};
  //BookForm:FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
 

  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone: NgZone,
    private crudService:CrudService,
    
  ){
    
    // this.BookForm=this.formBuilder.group({
    //   name:[],
    //   price:[],
    //   description:[],
    // })
  }
  ngOnInit(): void{

  }
  // onFileSelected(event: Event): void {
  //   console.log("file Selected");
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput.files && fileInput.files[0]) {
  //     const file = fileInput.files[0];
  //     console.log(file);
  //     const reader = new FileReader();
  //     reader.onload = () =>{
  //       this.imageData = reader.result as string;
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }

  onSubmit():any{
    if(this.book.name&&this.book.price&&this.book.description!=''){
      console.log("this.book : ", this.book);
    this.crudService.AddBook(this.book)
    .subscribe(()=>{
      console.log("Data added");
      this.ngZone.run(()=>this.router.navigateByUrl('/books-list'))
    },(err)=>{
      window.alert("Error")
      console.log(err);
    })
    }else{
      window.alert("Please Enter the documents")
    }
  }
}
// ----------------------------------------------------------------

// // ng model
// import { Component, OnInit, NgZone } from '@angular/core';
// import { Router } from '@angular/router';
// import { Book, CrudService } from 'src/app/service/crud.service';
// import { FormGroup, FormBuilder } from '@angular/forms';

// @Component({
//   selector: 'app-addbook',
//   templateUrl: './addbook.component.html',
//   styleUrls: ['./addbook.component.css'],
// })
// export class AddbookComponent implements OnInit {

//   BookForm: FormGroup;
//   book: Book = {
//     _id:'',
//     name: '',
//     price: '',
//     description: '',
//   };

//   constructor(
//     public formBuilder: FormBuilder,
//     private router: Router,
//     private ngZone: NgZone,
//     private crudService: CrudService,
//   ){
//     this.BookForm = this.formBuilder.group({
//       name: '',
//       price: '',
//       description: ''
//     });
//   }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     console.log("this.bookForm.value : ", this.BookForm.value);
//     this.crudService.AddBook(this.BookForm.value)
//       .subscribe(() => {
//         console.log("Data added");
//         this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
//       }, (err) => {
//         console.log(err);
//       })
//   }
// }
