import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './components/addbook/addbook.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component'
import { HomeComponent } from './components/home/home.component';
import { UserlistingComponent } from './components/userlisting/userlisting.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books-list' },
  { path: 'books-list', component: BookListComponent },
  { path: 'add-book', component: AddbookComponent },
  { path: 'edit-book/:id', component: BookDetailComponent },
  { path: 'add-doc', component: UploadfileComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'userlisting', component: UserlistingComponent ,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'updatepopup', component: UpdatepopupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
