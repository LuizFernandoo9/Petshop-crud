import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolicitacaoComponent } from './add-solicitacao.component';

describe('AddSolicitacaoComponent', () => {
  let component: AddSolicitacaoComponent;
  let fixture: ComponentFixture<AddSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSolicitacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
