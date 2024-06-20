import { Component } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao/solicitacao.service';
import { PetService } from '../../services/pet/pet.service';
import { TutorService } from '../../services/tutor/tutor.service';
import { ServicoService } from '../../services/servico/servico.service';
import { Router } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { Tutor } from '../../models/tutor.model';
import { Servico } from '../../models/servico.model';
import { Solicitacao } from '../../models/solicitacao.model';

@Component({
  selector: 'app-add-solicitacao',
  templateUrl: './add-solicitacao.component.html',
  styleUrl: './add-solicitacao.component.css'
})
export class AddSolicitacaoComponent {
  solicitacao: Solicitacao = {
    petId: '',
    tutorId: '',
    servicoId: '',
    data: new Date()
  };
  pets: Pet[] = [];
  tutores: Tutor[] = [];
  servicos: Servico[] = [];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private petService: PetService,
    private tutorService: TutorService,
    private servicoService: ServicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe(pets => this.pets = pets);
    this.tutorService.getTutors().subscribe(tutores => this.tutores = tutores);
    this.servicoService.getServices().subscribe(servicos => this.servicos = servicos);
  }

  addSolicitacao(): void {
    this.solicitacaoService.addSolicitacao(this.solicitacao).then(() => {
      this.router.navigate(['/solicitacoes']);
    });
  }
}

