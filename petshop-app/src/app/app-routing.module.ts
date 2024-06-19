import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { TutorListComponent } from './components/tutor-list/tutor-list.component';
import { TutorFormComponent } from './components/tutor-form/tutor-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  { path: 'pets', component: PetListComponent },
  { path: 'pets/new', component: PetFormComponent },
  { path: 'pets/edit/:id', component: PetFormComponent },
  { path: 'tutors', component: TutorListComponent },
  { path: 'add-tutor', component: TutorFormComponent },
  { path: 'edit-tutor/:id', component: TutorFormComponent },
  { path: '', redirectTo: '/tutors', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
