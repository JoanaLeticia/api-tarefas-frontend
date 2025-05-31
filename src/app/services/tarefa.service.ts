import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

interface PaginacaoResponse<T> {
  dados: T[];
  paginaAtual: number;
  tamanhoPagina: number;
  totalRegistros: number;
  totalPaginas: number;
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private baseUrl: string = 'http://localhost:8080/tarefas';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Tarefa> {
    return this.httpClient.get<Tarefa>(`${this.baseUrl}/${id}`);
  }

  insert(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.baseUrl, tarefa);
  }

  update(tarefa: Tarefa): Observable<any> {
    return this.httpClient.put<Tarefa>(`${this.baseUrl}/${tarefa.id}`, tarefa);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}