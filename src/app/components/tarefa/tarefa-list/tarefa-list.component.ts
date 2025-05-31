import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../../models/tarefa.model';
import { TarefaService } from '../../../services/tarefa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtBrPaginatorIntl } from '../../../shared/utils/pt-br-paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tarefa-list',
  standalone: true,
  imports: [
    MatPaginatorModule, 
    RouterLink, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.css',
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() }
  ]
})
export class TarefaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'descricao', 'status', 'acao'];
  tarefas: any[] = [];

  constructor(private tarefaService: TarefaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.findAll().subscribe({
      next: (data) => {
        this.tarefas = data;
        console.log('Dados recebidos:', data); // Verifique no console
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      }
    });
  }

  removerTarefa(id: number): void {
    const tarefaRemovida = this.tarefas.find(t => t.id === id);
    
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    
    const snackBarRef = this.snackBar.open('Tarefa removida', 'Desfazer', {
      duration: 5000
    });

    snackBarRef.onAction().subscribe(() => {
      this.tarefas = [...this.tarefas, tarefaRemovida];
    });

    snackBarRef.afterDismissed().subscribe(info => {
      if (!info.dismissedByAction) {
        this.tarefaService.delete(id).subscribe({
          error: (err) => {
            console.error('Erro ao remover tarefa:', err);
            this.snackBar.open('Erro ao remover tarefa!', 'Fechar', {
              duration: 3000
            });
            this.tarefas = [...this.tarefas, tarefaRemovida];
          }
        });
      }
    });
  }
}