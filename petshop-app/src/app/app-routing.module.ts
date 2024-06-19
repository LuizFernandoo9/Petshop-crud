import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { TutorListComponent } from './components/tutor-list/tutor-list.component';
import { TutorFormComponent } from './components/tutor-form/tutor-form.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AddSolicitacaoComponent } from './components/add-solicitacao/add-solicitacao.component';
import { SolicitacaoListComponent } from './components/solicitacao-list/solicitacao-list.component';

const routes: Routes = [
  { path: 'pets', component: PetListComponent },
  { path: 'pets/new', component: PetFormComponent },
  { path: 'pets/edit/:id', component: PetFormComponent },
  { path: 'tutors', component: TutorListComponent },
  { path: 'add-tutor', component: TutorFormComponent },
  { path: 'edit-tutor/:id', component: TutorFormComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'add-solicitacao', component: AddSolicitacaoComponent },
  { path: 'solicitacoes', component: SolicitacaoListComponent },
  { path: '', redirectTo: '/solicitacoes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
