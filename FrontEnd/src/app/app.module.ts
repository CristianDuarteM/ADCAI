import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RolesComponent } from './components/roles/roles.component';
import { PrincipalRowComponent } from './components/principal-row/principal-row.component';
import { StickyTableComponent } from './components/sticky-table/sticky-table.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagementFacultyComponent } from './pages/faculty/management-faculty/management-faculty.component';
import { FacultyDetailsComponent } from './components/faculty-details/faculty-details.component';
import { AddFacultyComponent } from './pages/faculty/add-faculty/add-faculty.component';
import { UpdateFacultyComponent } from './pages/faculty/update-faculty/update-faculty.component';
import { ManagementDepartmentComponent } from './pages/department/management-department/management-department.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { AddDepartmentComponent } from './pages/department/add-department/add-department.component';
import { UpdateDepartmentComponent } from './pages/department/update-department/update-department.component';
import { DisableDialogComponent } from './components/disable-dialog/disable-dialog.component';
import { ManagementTeacherComponent } from './components/teacher/management-teacher/management-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RolesComponent,
    PrincipalRowComponent,
    StickyTableComponent,
    LoginComponent,
    HomeComponent,
    ManagementFacultyComponent,
    FacultyDetailsComponent,
    AddFacultyComponent,
    UpdateFacultyComponent,
    ManagementDepartmentComponent,
    DepartmentDetailsComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    ManagementTeacherComponent,
    DisableDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
