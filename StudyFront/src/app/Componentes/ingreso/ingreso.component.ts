import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormUsuarioComponent } from '../Forms/form-usuario/form-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { FormIngresoComponent } from '../Forms/form-ingreso/form-ingreso.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent implements OnInit {

  Titulo = "Ingresos";

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(public api:ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource;
  }

  openDialog(){
    this.dialog.open(FormIngresoComponent,{
    })
  }

  ngOnInit(): void {
    this.api.GET("Ingreso").then((res) => {

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

  async eliminarIngreso(Ingreso: any) {
    console.log(Ingreso.idIngreso);
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
        await this.api.delete("Ingreso", Ingreso.idIngreso);
  
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
