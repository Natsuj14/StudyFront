import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormPreguntaComponent } from '../Forms/form-pregunta/form-pregunta.component';
import Swal from 'sweetalert2';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  Titulo = "Preguntas"

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(public api: ApiService, public dialog: MatDialog, public modalService: ModalServoceService) {
    this.dataSource = new MatTableDataSource();
  }

  openDialog(){
    this.modalService.accion.next("Registrar");
    this.modalService.titulo = "Crear pregunta"
    this.dialog.open(FormPreguntaComponent,{
    })
  }
  ngOnInit(): void {
    this.api.GET("Preguntas").then((res) => {

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

  async editarPregunta(Pregunta: any) {
    this.modalService.accion.next("Modificar");
    this.modalService.titulo = "Editar pregunta";
    this.modalService.pregunta = Pregunta;
    this.modalService.id = Pregunta.idPregunta;
    this.dialog.open(FormPreguntaComponent,{
    })
  }


  async eliminarPregunta(Pregunta: any) {
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
        await this.api.delete("Preguntas", Pregunta.idPreguntas);
  
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

