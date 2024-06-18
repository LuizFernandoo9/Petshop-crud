import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Pet } from '../../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private collectionName = 'pets';

  constructor(private firestore: AngularFirestore) { }

  getPets(): Observable<Pet[]> {
    return this.firestore.collection<Pet>(this.collectionName).valueChanges({ idField: 'id' });
  }

  getPet(id: string): Observable<Pet> {
    return this.firestore.collection<Pet>(this.collectionName).doc(id).valueChanges() as Observable<Pet>;
  }

  createPet(pet: Pet): Promise<void> {
    const id = this.firestore.createId();
    pet.id = id;
    return this.firestore.collection(this.collectionName).doc(id).set(pet);
  }

  updatePet(id: string, pet: Pet): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(pet);
  }

  deletePet(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
