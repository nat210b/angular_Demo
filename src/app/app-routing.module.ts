import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './components/addbook/addbook.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'books-list'},
  {path:'books-list',component:BookListComponent},
  {path:'add-book',component:AddbookComponent},
  {path:'edit-book/:id',component:BookDetailComponent},
  {path:'add-doc',component:UploadfileComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
