import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormPersonaComponent } from '../Forms/form-persona/form-persona.component';
import { FormMateriaComponent } from '../Forms/form-materia/form-materia.component';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  Titulo = "Materias"

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(public api: ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();

  }

  openDialog(){
    this.dialog.open(FormMateriaComponent,{
    })
  }

  ngOnInit(): void {
    this.api.GET("Materia").then((res) => {

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

  editarMateria(materia: any) {
  //
}

eliminarMateria(materia: any) {
  console.log(materia.idMateria);
  try {
    this.api.delete("Materia", materia.idMateria).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.error("Error al eliminar la materia", error);
    });
  } catch (e) {
    console.log("error error");
  }
}



}
