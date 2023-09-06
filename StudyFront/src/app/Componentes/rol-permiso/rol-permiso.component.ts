import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-rol-permiso',
  templateUrl: './rol-permiso.component.html',
  styleUrls: ['./rol-permiso.component.css']
})
export class RolPermisoComponent implements OnInit {
  Titulo = "Roles - Permisos"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("RolPermiso");
  }
}
