import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Tarefa } from '../../models/tarefa.model';
import { inject } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';

export const tarefaResolver: ResolveFn<Tarefa> = 
    (route : ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      
      return inject(TarefaService).findById(route.paramMap.get('id')!);
    
};
