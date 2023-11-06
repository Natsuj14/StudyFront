import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormRolPermisoComponent } from '../Forms/form-rol-permiso/form-rol-permiso.component';
import Swal from 'sweetalert2';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';

@Component({
  selector: 'app-rol-permiso',
  templateUrl: './rol-permiso.component.html',
  styleUrls: ['./rol-permiso.component.css']
})
export class RolPermisoComponent implements OnInit {
  Titulo = "Roles - Permisos"

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(public api: ApiService, public dialog: MatDialog, public modalService: ModalServoceService) {
    this.dataSource = new MatTableDataSource();

  }

  openDialog() {
    this.modalService.accion.next("Registrar");
    this.modalService.titulo = "Crear rol-permiso";
    this.dialog.open(FormRolPermisoComponent, {
    })
  }

  ngOnInit(): void {
    this.api.GET("RolPermiso").then((res) => {

      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]]);
      }

      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadTable(data: any[]) {
    this.displayedColumns = [];
    for (let column in data[0]) {
      this.displayedColumns.push(column)

    }
    this.displayedColumns.push('Acciones');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async editarRolPermiso(RolPermiso: any) {
    this.modalService.accion.next("Modificar");
    this.modalService.titulo = "Editar rol-permiso";
    this.modalService.rolPermiso = RolPermiso;
    this.dialog.open(FormRolPermisoComponent, {
    })
  }

  async eliminarRolPermiso(RolPermiso: any) {
    console.log(RolPermiso.idRolPermiso);
    const result = await Swal.fire({
      title: '¿Desea confirmar?',
      text: '¿Desea borrar el dato definitivamente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await this.api.delete("RolPermiso", RolPermiso.idRolPermiso);

        await Swal.fire({
          title: 'Dato eliminado',
          text: 'Se eliminó el campo exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        window.location.reload();

      } catch (error) {
        Swal.fire(
          'Error al borrar los datos',
          'Por favor, inténtelo de nuevo',
          'error'
        );
      }
    }
  }

}
