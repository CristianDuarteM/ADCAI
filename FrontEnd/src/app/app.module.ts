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
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HttpClientModule } from "@angular/common/http";

import { AdminGuard } from './guards/admin-guard';
import { AuthService } from './services/auth/auth.service';

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
import { ManagementTeacherComponent } from './pages/teacher/management-teacher/management-teacher.component';
import { SearchedTeacherComponent } from './pages/teacher/searched-teacher/searched-teacher.component';
import { UpdateTeacherComponent } from './pages/teacher/update-teacher/update-teacher.component';
import { AddTeacherComponent } from './pages/teacher/add-teacher/add-teacher.component';
import { AddManualTeacherComponent } from './pages/teacher/add-manual-teacher/add-manual-teacher.component';
import { AddMassiveTeacherComponent } from './pages/teacher/add-massive-teacher/add-massive-teacher.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ViewProfileComponent } from './pages/user/view-profile/view-profile.component';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
import { NotificationsComponent } from './pages/user/notifications/notifications.component';
import { ViewTeacherComponent } from './pages/teacher/view-teacher/view-teacher.component';
import { HistoricalComponent } from './pages/cai/historical/historical.component';
import { BasicCaiComponent } from './components/basic-cai/basic-cai.component';
import { RequestCaiComponent } from './pages/cai/request-cai/request-cai.component';
import { ManagementCaiComponent } from './pages/cai/management-cai/management-cai.component';
import { UpdateRequestCaiComponent } from './pages/cai/update-request-cai/update-request-cai.component';
import { ValidateCaiComponent } from './pages/cai/validate-cai/validate-cai.component';
import { InformativeDialogComponent } from './components/informative-dialog/informative-dialog.component';
import { EnableDialogComponent } from './components/enable-dialog/enable-dialog.component';

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
    SearchedTeacherComponent,
    UpdateTeacherComponent,
    AddTeacherComponent,
    AddManualTeacherComponent,
    AddMassiveTeacherComponent,
    UserDetailsComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    NotificationsComponent,
    ViewTeacherComponent,
    HistoricalComponent,
    BasicCaiComponent,
    RequestCaiComponent,
    ManagementCaiComponent,
    UpdateRequestCaiComponent,
    ValidateCaiComponent,
    InformativeDialogComponent,
    EnableDialogComponent,
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
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPermissionsModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AdminGuard,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
