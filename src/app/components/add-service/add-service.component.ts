import { Component } from '@angular/core';
import { ServicoService } from '../../services/servico/servico.service';
import { Servico } from '../../models/servico.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {

  nome: string = "";
  descricao: string = '';
  preco: number = 0;
  duracao: number = 0;

  constructor(private serviceService: ServicoService, private route: ActivatedRoute,private router: Router) {}

  onSubmit() {
    const novoServico: Servico = {
      name: this.nome,
      description: this.descricao,
      price: this.preco,
      duration: this.duracao
    };

    this.serviceService.addService(novoServico)

      .then(() => {
        console.log('Serviço adicionado com sucesso!');
        this.router.navigate(['/services']);
        // Limpar campos após adicionar com sucesso
        this.nome = '';
        this.descricao = '';
        this.preco = 0;
        this.duracao = 0;
      })
      .catch(error => {
        console.error('Erro ao adicionar serviço:', error);
      });
  }
}
