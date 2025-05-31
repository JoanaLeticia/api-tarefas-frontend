import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefaService } from '../../../services/tarefa.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Tarefa } from '../../../models/tarefa.model';


@Component({
  selector: 'app-tarefa-form',
  imports: [RouterLink, NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule],
  templateUrl: './tarefa-form.component.html',
  styleUrl: './tarefa-form.component.css'
})
export class TarefaFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const tarefa: Tarefa = this.activatedRoute.snapshot.data['tarefa'];

    this.formGroup = this.formBuilder.group({
      id: [(tarefa && tarefa.id) ? tarefa.id : null],
      titulo: [(tarefa && tarefa.titulo) ? tarefa.titulo : '', Validators.required],
      descricao: [(tarefa && tarefa.descricao) ? tarefa.descricao : '', Validators.required],
      status: [(tarefa && tarefa.status) ? tarefa.status : '', Validators.required]
    })

  }

  salvar() {
    if (this.formGroup.valid) {
      const tarefa = this.formGroup.value;

      if(tarefa.id == null) {
        this.tarefaService.insert(tarefa).subscribe({
          next: (tarefaCadastrado) => {
            this.router.navigateByUrl('/tarefas');
          },
          error: (errorResponse) => {
            console.log('Erro ao gravar' + JSON.stringify(errorResponse));
          }
        })
      } else {
        this.tarefaService.update(tarefa).subscribe({
          next: () => {
            this.router.navigateByUrl('/tarefas');
          },
          error: (errorResponse) => {
            console.log('Erro ao gravar' + JSON.stringify(errorResponse));
          }
        })
      }
    }
  }
  excluir() {
    const tarefa = this.formGroup.value;
    if(tarefa.id != null) {
      this.tarefaService.delete(tarefa).subscribe({
        next: () => {
          this.router.navigateByUrl('/tarefas');
        },
        error: (errorResponse) => {
          console.log('Erro ao excluir' + JSON.stringify(errorResponse));
        }
      })
    }
  }

}
