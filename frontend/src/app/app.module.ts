import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule,
  MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule,
  MatSliderModule, MatMenuModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ListComponent } from './movies/list/list.component';
import { CreateComponent } from './movies/create/create.component';
import { EditComponent } from './movies/edit/edit.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatSnackBarModule,
        MatSliderModule,
        MatMenuModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        ListComponent,
        CreateComponent,
        EditComponent,
        LoginComponent,
        SignupComponent,
        CategoryComponent
    ],
    // TODO: add user profile
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
