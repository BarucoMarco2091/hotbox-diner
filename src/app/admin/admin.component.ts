import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../models/produto";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="admin-container">
      <h2>Painel Administrativo</h2>
      <form (ngSubmit)="salvarProduto()" class="form">
        <input [(ngModel)]="produto.nome" name="nome" placeholder="Nome" required>
        <input type="number" [(ngModel)]="produto.preco" name="preco" placeholder="Preço" required>
        <input [(ngModel)]="produto.imagem" name="imagem" placeholder="URL da imagem" required>
        <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }}</button>
        <button *ngIf="editando" type="button" (click)="cancelarEdicao()">Cancelar</button>
      </form>

      <ul class="lista">
        <li *ngFor="let p of produtos">
          <img [src]="p.imagem" alt="{{ p.nome }}" width="50">
          {{ p.nome }} - R$ {{ p.preco.toFixed(2) }}
          <button (click)="editar(p)">✏️</button>
          <button (click)="remover(p.id!)">🗑️</button>
        </li>
      </ul>

      <button class="sair" (click)="logout()">Sair</button>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; max-width: 500px; margin: auto; }
    .form input { display: block; margin: 0.5rem 0; width: 100%; }
    .form button { margin-top: 0.5rem; }
    .lista { list-style: none; padding: 0; }
    .lista li { margin: 1rem 0; display: flex; align-items: center; gap: 0.5rem; }
    .sair { margin-top: 2rem; background: red; color: white; border: none; padding: 0.5rem 1rem; }
  `]
})

export class AdminComponent implements OnInit {
    produtos: Produto[] = [];
    produto: Produto = { nome: '', description: '', preco: 0, imagem: ''};
    editando = false;
    idEditando: string | null = null;

    constructor(
        private produtoService: ProdutoService, private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.produtoService.listar().subscribe(lista => this.produtos = lista);
    }

    salvarProduto() {
        if(this.editando && this.idEditando) {
            this.produtoService.atualizar(this.idEditando, this.produto).then(() => {
                this.cancelarEdicao();
            });
        } else {
            this.produtoService.adicionar(this.produto)
        }

        this.produto = { nome: '', description: '', preco:0, imagem: ''};
    }

    remover(id: string) {
        this.produtoService.remover(id);
    }

    editar(p: Produto) {
        this.produto = { nome: p.nome, description: p.description, preco: p.preco, imagem: p.imagem};
        this.editando = true;
        this.idEditando = p.id!;
    }

    cancelarEdicao() {
        this.editando = false;
        this.idEditando = null;
        this.produto = { nome: '', description: '', preco: 0, imagem: ''};
    }

    logout() {
        this.auth.logout();
    }
}