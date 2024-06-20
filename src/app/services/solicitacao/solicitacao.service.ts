import { Injectable } from '@angular/core';
import { Solicitacao } from '../../models/solicitacao.model';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private solicitacoesCollection: AngularFirestoreCollection<Solicitacao>;

  constructor(private firestore: AngularFirestore) {
    this.solicitacoesCollection = this.firestore.collection<Solicitacao>('solicitacoes');
  }

  getSolicitacoes(): Observable<Solicitacao[]> {
    return this.solicitacoesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Solicitacao;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addSolicitacao(solicitacao: Solicitacao): Promise<void> {
    return this.solicitacoesCollection.add(solicitacao).then(() => {
      console.log('Solicitação adicionada com sucesso');
    }).catch(error => {
      console.error('Erro ao adicionar solicitação:', error);
      throw error;
    });
  }

  updateSolicitacao(solicitacaoId: string, solicitacao: Solicitacao): Promise<void> {
    return this.solicitacoesCollection.doc(solicitacaoId).update(solicitacao).then(() => {
      console.log('Solicitação atualizada com sucesso');
    }).catch(error => {
      console.error('Erro ao atualizar solicitação:', error);
      throw error;
    });
  }

  deleteSolicitacao(solicitacaoId: string): Promise<void> {
    return this.solicitacoesCollection.doc(solicitacaoId).delete().then(() => {
      console.log('Solicitação excluída com sucesso');
    }).catch(error => {
      console.error('Erro ao excluir solicitação:', error);
      throw error;
    });
  }
}
