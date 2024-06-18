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

@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    TutorComponent,
    ServicoComponent,
    SolicitacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
