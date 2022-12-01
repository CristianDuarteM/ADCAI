import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RolesComponent } from './roles/roles.component';
import { PrincipalRowComponent } from './components/principal-row/principal-row.component';
import { ManagementFacultyComponent } from './components/faculty/management-faculty/management-faculty.component';
import { StickyTableComponent } from './components/sticky-table/sticky-table.component';
import { ManagementDepartmentComponent } from './components/department/management-department/management-department.component';
import { AddFacultyComponent } from './components/faculty/add-faculty/add-faculty.component';
import { FacultyDetailsComponent } from './components/faculty/faculty-details/faculty-details.component';
import { UpdateFacultyComponent } from './components/faculty/update-faculty/update-faculty.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { DepartmentDetailsComponent } from './components/department/department-details/department-details.component';
import { UpdateDepartmentComponent } from './components/department/update-department/update-department.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RolesComponent,
    PrincipalRowComponent,
    ManagementFacultyComponent,
    StickyTableComponent,
    ManagementDepartmentComponent,
    AddFacultyComponent,
    FacultyDetailsComponent,
    UpdateFacultyComponent,
    AddDepartmentComponent,
    DepartmentDetailsComponent,
    UpdateDepartmentComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
