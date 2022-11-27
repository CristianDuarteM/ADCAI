import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PrincipalRowComponent } from './components/principal-row/principal-row.component';
import { ManagementFacultyComponent } from './components/faculty/management-faculty/management-faculty.component';
import { StickyTableComponent } from './components/sticky-table/sticky-table.component';
import { ManagementDepartmentComponent } from './components/department/management-department/management-department.component';
import { AddFacultyComponent } from './components/faculty/add-faculty/add-faculty.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    PrincipalRowComponent,
    ManagementFacultyComponent,
    StickyTableComponent,
    ManagementDepartmentComponent,
    AddFacultyComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
