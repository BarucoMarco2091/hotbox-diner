import { Component, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  itens: MenuItem[] = [];
  novoItem: MenuItem = { nome: '', descricao: '', preco: 0, imagem: '' };

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.getItens().subscribe(data => {
      this.itens = data;
    });
  }

  adicionar() {
    this.menuService.addItem(this.novoItem).then(() => {
      this.novoItem = { nome: '', descricao: '', preco: 0, imagem: '' };
    });
  }

  remover(id: string) {
    this.menuService.deleteItem(id);
  }
}
