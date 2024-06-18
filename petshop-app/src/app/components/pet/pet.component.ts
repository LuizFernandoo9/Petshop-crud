import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pets: Pet[] = [];
  pet: Pet = { id: '', name: '', species: '', age: 0, birthDate: new Date(), weight: 0, color: '', sex: '' };

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe(data => {
      this.pets = data;
    });
  }

  createPet(): void {
    this.petService.createPet(this.pet).then(() => {
      console.log('Pet created successfully');
      this.pet = { id: '', name: '', species: '', age: 0, birthDate: new Date(), weight: 0, color: '', sex: '' };
    });
  }

  updatePet(): void {
    this.petService.updatePet(this.pet.id!, this.pet).then(() => {
      console.log('Pet updated successfully');
    });
  }

  deletePet(id: string): void {
    this.petService.deletePet(id).then(() => {
      console.log('Pet deleted successfully');
    });
  }

  selectPet(pet: Pet): void {
    this.pet = { ...pet };
  }
}
