import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { ManagementFacultyComponent } from './pages/faculty/management-faculty/management-faculty.component';
import { AddFacultyComponent } from './pages/faculty/add-faculty/add-faculty.component';
import { UpdateFacultyComponent } from './pages/faculty/update-faculty/update-faculty.component';
import { ManagementDepartmentComponent } from './pages/department/management-department/management-department.component';
import { AddDepartmentComponent } from './pages/department/add-department/add-department.component';
import { UpdateDepartmentComponent } from './pages/department/update-department/update-department.component';
import { ManagementTeacherComponent } from './components/teacher/management-teacher/management-teacher.component';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent, pathMatch: "full" },
  { path: "gestion-facultades", component: ManagementFacultyComponent, pathMatch: "full" },
  { path: "gestion-facultades/agregar", component: AddFacultyComponent, pathMatch: "full" },
  { path: "gestion-facultades/editar", component: UpdateFacultyComponent, pathMatch: "full" },
  { path: "gestion-departamentos", component: ManagementDepartmentComponent, pathMatch: "full" },
  { path: "gestion-departamentos/agregar", component: AddDepartmentComponent, pathMatch: "full" },
  { path: "gestion-departamentos/editar", component: UpdateDepartmentComponent, pathMatch: "full" },
  { path: "gestion-docentes", component: ManagementTeacherComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
