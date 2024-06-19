import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitacao } from '../../models/solicitacao.model';
import { Pet } from '../../models/pet.model';
import { Tutor } from '../../models/tutor.model';
import { Servico } from '../../models/servico.model';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { PetService } from '../../services/pet/pet.service';
import { TutorService } from '../../services/tutor/tutor.service';
import { ServicoService } from '../../services/servico/servico.service';

@Component({
  selector: 'app-solicitacao-list',
  templateUrl: './solicitacao-list.component.html',
  styleUrl: './solicitacao-list.component.css'
})
export class SolicitacaoListComponent implements OnInit {
  solicitacoes$: Observable<Solicitacao[]> | undefined;
  pets: Pet[] = [];
  tutores: Tutor[] = [];
  servicos: Servico[] = [];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private petService: PetService,
    private tutorService: TutorService,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    this.solicitacoes$ = this.solicitacaoService.getSolicitacoes();
    this.petService.getPets().subscribe(pets => this.pets = pets);
    this.tutorService.getTutors().subscribe(tutores => this.tutores = tutores);
    this.servicoService.getServices().subscribe(servicos => this.servicos = servicos);
  }

  deleteSolicitacao(solicitacaoId: string): void {
    this.solicitacaoService.deleteSolicitacao(solicitacaoId).then(() => {
      console.log('Solicitação excluída da base de dados');
    }).catch(error => {
      console.error('Erro ao excluir solicitação:', error);
    });
  }

  getPetName(petId: string): string {
    const pet = this.pets.find(p => p.id === petId);
    return pet ? pet.name : 'Desconhecido';
  }

  getTutorName(tutorId: string): string {
    const tutor = this.tutores.find(t => t.id === tutorId);
    return tutor ? tutor.name : 'Desconhecido';
  }

  getServicoName(servicoId: string): string {
    const servico = this.servicos.find(s => s.id === servicoId);
    return servico ? servico.name : 'Desconhecido';
  }
}
