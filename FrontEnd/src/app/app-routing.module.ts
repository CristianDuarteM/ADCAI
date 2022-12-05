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
import { ManagementTeacherComponent } from './pages/teacher/management-teacher/management-teacher.component';
import { SearchedTeacherComponent } from './pages/teacher/searched-teacher/searched-teacher.component';
import { UpdateTeacherComponent } from './pages/teacher/update-teacher/update-teacher.component';
import { AddTeacherComponent } from './pages/teacher/add-teacher/add-teacher.component';
import { AddManualTeacherComponent } from './pages/teacher/add-manual-teacher/add-manual-teacher.component';
import { AddMassiveTeacherComponent } from './pages/teacher/add-massive-teacher/add-massive-teacher.component';
import { ViewProfileComponent } from './pages/user/view-profile/view-profile.component';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';

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
  { path: "gestion-docentes/buscados", component: SearchedTeacherComponent, pathMatch: "full" },
  { path: "gestion-docentes/editar", component: UpdateTeacherComponent, pathMatch: "full" },
  { path: "gestion-docentes/agregar", component: AddTeacherComponent, pathMatch: "full" },
  { path: "gestion-docentes/agregar/manual", component: AddManualTeacherComponent, pathMatch: "full" },
  { path: "gestion-docentes/agregar/masivo", component: AddMassiveTeacherComponent, pathMatch: "full" },
  { path: "perfil", component: ViewProfileComponent, pathMatch: "full" },
  { path: "perfil/editar", component: UpdateProfileComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
