import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Servico } from '../../models/servico.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private servicosCollection: AngularFirestoreCollection<Servico>

  constructor(private firestore: AngularFirestore) {
    this.servicosCollection = this.firestore.collection<Servico>('servicos');
  }
  getServices(): Observable<Servico[]> {
    return this.servicosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Servico;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addService(service: Servico): Promise<void> {
    return this.servicosCollection.add(service).then(() => {
      console.log('Serviço adicionado com sucesso');
    }).catch((error) => {
      console.error('Erro ao adicionar serviço:', error);
    });
  }

  getServiceById(serviceId: string): Observable<Servico | undefined> {
    return this.servicosCollection.doc<Servico>(serviceId).valueChanges();
  }

  updateService(serviceId: string, service: Servico): Promise<void> {
    delete service.id; // Não atualizar o ID
    return this.servicosCollection.doc(serviceId).update(service);
  }

  deleteService(serviceId: string): Promise<void> {
    return this.servicosCollection.doc(serviceId).delete().then(() => {
      console.log('Serviço excluído com sucesso');
    }).catch((error) => {
      console.error('Erro ao excluir serviço:', error);
    });
  }
}
