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
import { NotificationsComponent } from './pages/user/notifications/notifications.component';
import { ViewTeacherComponent } from './pages/teacher/view-teacher/view-teacher.component';
import { HistoricalComponent } from './pages/cai/historical/historical.component';
import { ManagementCaiComponent } from './pages/cai/management-cai/management-cai.component';
import { RequestCaiComponent } from './pages/cai/request-cai/request-cai.component';
import { UpdateRequestCaiComponent } from './pages/cai/update-request-cai/update-request-cai.component';
import { ValidateCaiComponent } from './pages/cai/validate-cai/validate-cai.component';
import { AdminGuard } from './guards/admin-guard';
import { AdminDirectorGuard } from './guards/admin-director-guard';
import { NoAdminGuard } from './guards/no-admin-guard';
import { DirectorGuard } from './guards/director-guard';
import { FillCaiComponent } from './pages/cai/fill-cai/fill-cai.component';
import { TeacherGuard } from './guards/teacher-guard';
import { ViewCaiComponent } from './pages/cai/view-cai/view-cai.component';
import { DeanDirectorGuard } from './guards/dean-director-guard';
import { ViewEvaluateCaiComponent } from './pages/cai/view-evaluate-cai/view-evaluate-cai.component';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent, pathMatch: "full" },
  { path: "gestion-facultades", component: ManagementFacultyComponent, pathMatch: "full", canActivate: [ AdminGuard ] },
  { path: "gestion-facultades/agregar", component: AddFacultyComponent, pathMatch: "full", canActivate: [ AdminGuard ] },
  { path: "gestion-facultades/editar/:id", component: UpdateFacultyComponent, pathMatch: "full", canActivate: [ AdminGuard ] },
  { path: "gestion-departamentos", component: ManagementDepartmentComponent, pathMatch: "full", canActivate: [ AdminGuard ] },
  { path: "gestion-departamentos/agregar", component: AddDepartmentComponent, pathMatch: "full", canActivate: [ AdminGuard ] },
  { path: "gestion-departamentos/editar/:id", component: UpdateDepartmentComponent, pathMatch: "full", canActivate: [ AdminGuard ] },
  { path: "gestion-docentes", component: ManagementTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "gestion-docentes/buscados/facultad/:idFaculty/departamento/:idDepartment", component: SearchedTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "gestion-docentes/buscados/editar/:idUser", component: UpdateTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "gestion-docentes/buscados/ver/:idUser", component: ViewTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "gestion-docentes/agregar/facultad/:idFaculty/departamento/:idDepartment", component: AddTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "gestion-docentes/agregar/manual/facultad/:idFaculty/departamento/:idDepartment", component: AddManualTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "gestion-docentes/agregar/masivo/facultad/:idFaculty/departamento/:idDepartment", component: AddMassiveTeacherComponent, pathMatch: "full", canActivate: [AdminDirectorGuard] },
  { path: "perfil/:idUser", component: ViewProfileComponent, pathMatch: "full", canActivate: [NoAdminGuard] },
  { path: "perfil/editar/:idUser", component: UpdateProfileComponent, pathMatch: "full", canActivate: [NoAdminGuard] },
  { path: "notificaciones", component: NotificationsComponent, pathMatch: "full", canActivate: [NoAdminGuard] },
  { path: "historial-cai", component: HistoricalComponent, pathMatch: "full", canActivate: [NoAdminGuard] },
  { path: "historial-cai/ver/:idCai", component: ViewCaiComponent, pathMatch: "full", canActivate: [NoAdminGuard] },
  { path: "gestion-cai", component: ManagementCaiComponent, pathMatch: "full",  canActivate: [DirectorGuard] },
  { path: "gestion-cai/agregar", component: RequestCaiComponent, pathMatch: "full", canActivate: [DirectorGuard] },
  { path: "gestion-cai/actualizar-periodo", component: UpdateRequestCaiComponent, pathMatch: "full", canActivate: [DirectorGuard] },
  { path: "evaluar-cai", component: ValidateCaiComponent, pathMatch: "full", canActivate: [DeanDirectorGuard] },
  { path: "evaluar-cai/:idCai", component: ViewEvaluateCaiComponent, pathMatch: "full", canActivate: [DeanDirectorGuard] },
  { path: "diligenciar-cai", component: FillCaiComponent, pathMatch: "full", canActivate: [TeacherGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
