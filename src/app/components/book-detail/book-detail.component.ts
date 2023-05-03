import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService, Book } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  getId: any;
  update_book={name:'',price:'',description:''};


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetBook(this.getId).subscribe((res: Book) => {
      this.update_book={
        name:res.name,
        price:res.price,
        description:res.description
      }
    });

    this.update_book={
      name:'',
      price:'',
      description:''
    }
  }
  openSnackBar() {
    this._snackBar.open("Data Updated","Close");
  }
  onUpdate() {
    this.crudService.updateBook(this.getId, this.update_book)
      .subscribe(() => {
        this.openSnackBar()
        console.log("Data updated");
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      }, (err) => {
        console.log(err);
      });
  }
}
