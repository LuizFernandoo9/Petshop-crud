import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorService } from '../../services/tutor/tutor.service';
import { Tutor } from '../../models/tutor.model';
import { CepService } from '../../services/cep/cep.service';
import { IbgeService } from '../../services/ibge/ibge.service';

@Component({
  selector: 'app-tutor-form',
  templateUrl: './tutor-form.component.html',
  styleUrls: ['./tutor-form.component.css']
})
export class TutorFormComponent implements OnInit {
  tutor: Tutor = {
    id: '',
    name: '',
    street: '',
    neighborhood: '',
    number: 0,
    city: '',
    cep: '',
    state: '',
    phone: '',
    cpf: '',
    sex: ''
  };
  tutorId: string | null = null;
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute,
    private cepService: CepService,
    private ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.tutorId = this.route.snapshot.paramMap.get('id');
    if (this.tutorId) {
      this.tutorService.getTutorById(this.tutorId).subscribe((tutor) => {
        if (tutor) {
          this.tutor = tutor;
          if (tutor.state) {
            this.loadCities(tutor.state);
          }
        }
      });
    }
    this.loadStates();
  }

  loadStates(): void {
    this.ibgeService.getStates().subscribe((states) => {
      this.states = states;
    });
  }

  loadCities(state: string): void {
    const selectedState = this.states.find((s: any) => s.sigla === state);
    if (selectedState) {
      this.ibgeService.getCities(selectedState.id).subscribe((cities) => {
        this.cities = cities;
      });
    }
  }

  onSubmit(): void {
    console.log('onSubmit called'); // Adicione isso para verificar se o método está sendo chamado
    if (this.tutorId) {
      this.tutorService.updateTutor(this.tutor).then(() => {
        this.router.navigate(['/tutors']);
      });
    } else {
      this.tutorService.addTutor(this.tutor).then(() => {
        this.router.navigate(['/tutors']);
      });
    }
  }

  searchCep(): void {
    if (this.tutor.cep) {
      this.cepService.getAddressByCep(this.tutor.cep).subscribe(
        (data) => {
          if (!data.erro) {
            this.tutor.street = data.logradouro;
            this.tutor.neighborhood = data.bairro;
            this.tutor.city = data.localidade;
            this.tutor.state = data.uf;
            this.loadCities(data.uf);
          } else {
            alert('CEP não encontrado.');
          }
        },
        (error) => {
          alert('Erro ao buscar o CEP.');
        }
      );
    }
  }
}
