import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet/pet.service';


@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  pet: Pet = {
    id: '',
    name: '',
    species: '',
    age: 0,
    birthDate: new Date(),
    weight: 0,
    color: '',
    sex: ''
  };

  sexOptions: any[] = [
    { label: 'Macho', value: 'M' },
    { label: 'Fêmea', value: 'F' }
  ];

  isEdit: boolean = false;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.petService.getPet(id).subscribe(pet => {
        if (pet) {
          this.pet = pet;
        }
      });
    }
  }

  savePet(): void {
    if (this.isEdit) {
      this.petService.updatePet(this.pet.id!, this.pet).then(() => {
        console.log('Pet updated successfully');
        this.router.navigate(['/pets']);
      }).catch(error => {
        console.error('Error updating pet: ', error);
      });
    } else {
      this.petService.createPet(this.pet).then(() => {
        console.log('Pet created successfully');
        this.router.navigate(['/pets']);
      }).catch(error => {
        console.error('Error creating pet: ', error);
      });
    }
  }
}
