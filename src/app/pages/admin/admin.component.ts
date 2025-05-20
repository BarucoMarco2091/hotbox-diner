import { Component, OnInit } from '@angular/core';
import { CardapioService, Pastel } from '../../services/cardapio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [ ReactiveFormsModule, NgFor ]
})
export class AdminComponent implements OnInit {
  itens: Pastel[] = [];
  form: FormGroup;
  carregando = false;

  constructor(
    private cardapioService: CardapioService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cardapioService.menuItems.subscribe((dados) => {
      this.itens = dados;
    });
  }

  async adicionarItem() {
    if (this.form.valid) {
      this.carregando = true;
      await this.cardapioService.adicionarPastel(this.form.value);
      this.form.reset();
      this.carregando = false;
    }
  }

  async removerItem(id: string) {
    this.carregando = true;
    await this.cardapioService.removerPastel(id);
    this.carregando = false;
  }
}
