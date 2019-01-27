import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guards';
import { ListComponent } from './movies/list/list.component';
import { CreateComponent } from './movies/create/create.component';
import { EditComponent } from './movies/edit/edit.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    // { path: '', component: HomeComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'logout', component: LoginComponent },

    { path: 'create', component: CreateComponent},
    { path: 'edit/:id', component: EditComponent},
    { path: 'list', component: ListComponent},
    { path: 'category/:id', component: CategoryComponent},
    // { path: '', redirectTo: 'list', pathMatch: 'full'}

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
