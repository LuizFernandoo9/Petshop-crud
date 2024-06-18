import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Pet } from '../../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private collectionName = 'pets';

  constructor(private firestore: AngularFirestore) {}

  createPet(pet: Pet): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`${this.collectionName}/${id}`).set({ id, ...pet });
  }

  getPets(): Observable<Pet[]> {
    return this.firestore.collection<Pet>(this.collectionName).valueChanges();
  }

  updatePet(id: string, pet: Pet): Promise<void> {
    return this.firestore.doc(`${this.collectionName}/${id}`).update(pet);
  }

  deletePet(id: string): Promise<void> {
    return this.firestore.doc(`${this.collectionName}/${id}`).delete();
  }
}
