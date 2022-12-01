import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ManagementFacultyComponent } from './components/faculty/management-faculty/management-faculty.component';
import { ManagementDepartmentComponent } from './components/department/management-department/management-department.component';
import { AddFacultyComponent } from './components/faculty/add-faculty/add-faculty.component';
import { UpdateFacultyComponent } from './components/faculty/update-faculty/update-faculty.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { UpdateDepartmentComponent } from './components/department/update-department/update-department.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
