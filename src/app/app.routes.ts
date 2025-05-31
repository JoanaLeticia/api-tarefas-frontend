import { Routes } from '@angular/router';
import { TarefaListComponent } from './components/tarefa/tarefa-list/tarefa-list.component';
import { TarefaFormComponent } from './components/tarefa/tarefa-form/tarefa-form.component';
import { tarefaResolver } from './components/tarefa/tarefa.resolver';

export const routes: Routes = [
    {path: 'tarefas', component: TarefaListComponent, title: 'Lista de Tarefas'},
    {path: 'tarefas/new', component: TarefaFormComponent, title: 'Nova Tarefa'},
    {path: 'tarefas/edit/:id', component: TarefaFormComponent, 
        title: 'Edição de Tarefa', resolve: {tarefa: tarefaResolver}},
];
