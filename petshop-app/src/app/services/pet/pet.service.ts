import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Pet } from '../../models/pet.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private collectionName = 'pets';
  private petsCollection: AngularFirestoreCollection<Pet>;

  constructor(private firestore: AngularFirestore) {
    this.petsCollection = this.firestore.collection<Pet>(this.collectionName);
  }

  getPets(): Observable<Pet[]> {
    return this.petsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Pet;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  getPet(id: string): Observable<Pet | undefined> {
    return this.petsCollection.doc<Pet>(id).valueChanges();
  }

  createPet(pet: Pet): Promise<void> {
    // Remove 'id' field from pet object to allow Firestore to generate an automatic ID
    const { ...petWithoutId } = pet;
    return this.petsCollection.add(petWithoutId)
      .then(docRef => {
        console.log('Pet added with ID: ', docRef.id);
      })
      .catch(error => {
        console.error('Error adding pet: ', error);
      });
  }

  updatePet(id: string, pet: Pet): Promise<void> {
    return this.petsCollection.doc(pet.id).update(pet)
      .then(() => {
        console.log('Pet updated successfully');
      })
      .catch(error => {
        console.error('Error updating pet: ', error);
      });
  }

  deletePet(id: string): Promise<void> {
    return this.petsCollection.doc(id).delete()
      .then(() => {
        console.log('Pet deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting pet: ', error);
      });
  }
}
