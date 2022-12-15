import { Injectable } from "@angular/core";
import { NgxPermissionsService } from "ngx-permissions";
import { config } from "../constants/config";

@Injectable({ providedIn: 'root' })
export class RolePermission {

  activeRole: string;

  constructor(private ngxPermissionsService: NgxPermissionsService) {
    this.activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '';
  }

  loadRole() {
    this.ngxPermissionsService.loadPermissions([this.activeRole]);
  }

}
