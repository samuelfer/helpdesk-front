import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []
  
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private tecnicoService: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.tecnicoService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Tecnico>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}