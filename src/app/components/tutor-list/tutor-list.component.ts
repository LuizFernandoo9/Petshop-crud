import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../services/tutor/tutor.service';
import { Tutor } from '../../models/tutor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  tutors: Tutor[] = [];

  constructor(private tutorService: TutorService, private router: Router) {}

  ngOnInit(): void {
    this.tutorService.getTutors().subscribe((tutors) => {
      this.tutors = tutors;
    });
  }

  deleteTutor(tutorId: string): void {
    this.tutorService.deleteTutor(tutorId).then(() => {
      this.tutors = this.tutors.filter(tutor => tutor.id !== tutorId);
    });
  }

  editTutor(tutorId: string): void {
    this.router.navigate(['/edit-tutor', tutorId]);
  }
}
