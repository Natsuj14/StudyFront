import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormAreaComponent } from '../Forms/form-area/form-area.component';
import Swal from 'sweetalert2';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})

export class AreaComponent implements OnInit {
  Titulo = "Areas";

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(public api: ApiService, public dialog: MatDialog, public modalService : ModalServoceService) {
    this.dataSource = new MatTableDataSource;
  }

  openDialog() {
    this.modalService.accion.next("Registrar");
    this.modalService.titulo = "Crear area";
    this.dialog.open(FormAreaComponent, {
    })
  }

  ngOnInit(): void {
    this.api.GET("Area").then((res) => {

      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]]);

      }

      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

    })
  }

  loadTable(data: any[]) {
    this.displayedColumns = [];

    for (let column in data[0]) {
      this.displayedColumns.push(column);
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

  async editarArea(Area: any) {
    this.modalService.accion.next("Modificar");
    this.modalService.titulo = "Editar area";
    this.dialog.open(FormAreaComponent,{
      height: 'auto',
      width: 'auto'
    })
  }

  async eliminarArea(Area: any) {
    console.log(Area.idArea);
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
        await this.api.delete("Area", Area.idArea);

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
