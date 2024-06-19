import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { Router } from '@angular/router';
import { PetService } from '../../services/pet/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  pets: Pet[] = [];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe(data => {
      this.pets = data;
    });
  }

  editPet(petId: string): void {
    this.router.navigate(['/pets/edit', petId]);
  }

  deletePet(petId: string): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(petId).then(() => {
        console.log('Pet deleted successfully');
        this.pets = this.pets.filter(pet => pet.id !== petId);
      }).catch(error => {
        console.error('Error deleting pet: ', error);
      });
    }
  }
}
