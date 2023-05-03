import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  Books: any = [];
  num: any;
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe((res) => {
      this.Books = res; // Assign the response to the Books property
      console.log(res);
      console.log(this.Books.length)
      this.num = this.Books.length
    });
  }
  delete(id: any, i: any) {
    console.log(id)
    if (window.confirm("Delete?")) {
      this.crudService.DeleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
        console.log(this.Books.length)
        this.num = this.Books.length
      })
    }
  }
}
