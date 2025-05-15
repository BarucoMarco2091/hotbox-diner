import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardapioService } from '../../services/cardapio.service';

interface Pastel {
  name: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  novoPastel: Pastel = {
    name: '',
    description: '',
    price: 0,
    image: ''
  }
  constructor(private auth: AuthService, public cardapioService: CardapioService) {}

  adicionarPastel() {
    if(this.novoPastel.name && this.novoPastel.price > 0) {
      this.cardapioService.adicionarPastel({...this.novoPastel});
      this.novoPastel = { name: '', description: '', price: 0, image: ''};
    }
  }

  removerPastel(index: number) {
    this.cardapioService.removerPastel(index);
  }

  logout() {
    this.auth.logout();
  }

}
