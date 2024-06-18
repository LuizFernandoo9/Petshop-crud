import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PetComponent } from './components/pet/pet.component';
import { TutorComponent } from './components/tutor/tutor.component';
import { ServicoComponent } from './components/servico/servico.component';
import { SolicitacaoComponent } from './components/solicitacao/solicitacao.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    TutorComponent,
    ServicoComponent,
    SolicitacaoComponent,
    PetListComponent,
    PetFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
