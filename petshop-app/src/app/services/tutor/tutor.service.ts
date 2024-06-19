import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Tutor } from '../../models/tutor.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private tutorsCollection: AngularFirestoreCollection<Tutor>;

  constructor(private firestore: AngularFirestore) {
    this.tutorsCollection = this.firestore.collection<Tutor>('tutors');
  }

  createId(): string {
    return this.firestore.createId();
  }

  addTutor(tutor: Tutor): Promise<void> {
    const id = this.firestore.createId();
    return this.tutorsCollection.doc(id).set({ ...tutor, id });
  }

  getTutors(): Observable<Tutor[]> {
    return this.tutorsCollection.valueChanges({ idField: 'id' });
  }

  getTutorById(tutorId: string): Observable<Tutor | undefined> {
    return this.tutorsCollection.doc(tutorId).valueChanges();
  }

  updateTutor(tutor: Tutor): Promise<void> {
    return this.tutorsCollection.doc(tutor.id).update(tutor);
  }

  deleteTutor(tutorId: string): Promise<void> {
    return this.tutorsCollection.doc(tutorId).delete();
  }
}
