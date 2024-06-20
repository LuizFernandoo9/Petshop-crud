import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../../models/servico.model';
import { ServicoService } from '../../services/servico/servico.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  servicos$: Observable<Servico[]> | undefined;

  constructor(private servicoService: ServicoService) {}

  ngOnInit(): void {
    this.servicos$ = this.servicoService.getServices();
  }

  deleteService(serviceId: string): void {
    this.servicoService.deleteService(serviceId)
      .catch(error => console.error('Erro ao excluir serviço:', error));
  }
}

