import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../models/produto";

interface CardapioItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})

export class CardapioComponent implements OnInit {
  produtosFirebase: Produto[] = [];
  produtosFixos: Produto[] = [
    { nome: 'Caesar Salad', description: 'Esse clássico, que combina croutons crocantes, alface fresquinha e molho cremoso, ganha o reforço do frango desfiado.', preco: 15.00, imagem: '/caesarsalad.webp' },
    { nome: 'Cheeseburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa.', preco: 25.00, imagem: '/cheeseburger.webp' },
    { nome: 'Coca-cola', description: 'Clássica, gelada e refrescante. Acompanha perfeitamente qualquer lanche.', preco: 5.00, imagem: '/cocacola.webp' },
    { nome: 'Esfiha de carne', description: 'Massa leve e douradinha, recheada com carne moída bem temperada, suculenta e assada no ponto ideal. Uma delícia irresistível!', preco: 30.00, imagem: '/esfihacarne.webp' },
    { nome: 'Esfiha de queijo', description: 'Massa macia e assada com generosidade, recheada com queijo derretido e cremoso. Sabor leve e irresistível a cada mordida!', preco: 25.00, imagem: '/esfiha.webp' },
    { nome: 'Batata frita', description: 'Nossas fritas com uma cobertura irresistível de mix de queijos e bacon. O toque final fica por conta do molho Ranch.', preco: 20.00, imagem: '/frenchfries.webp' },
    { nome: 'Hamburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa.', preco: 40.00, imagem: '/hamburger.webp' },
    { nome: 'Quibe', description: 'Clássico da culinária árabe! Crocante por fora, macio por dentro e recheado com carne temperada e hortelã. Um sabor marcante que conquista no primeiro pedaço!', preco: 20.00, imagem: '/kibe.webp' },
    { nome: 'Onion rings', description: 'Feitos com cebolas selecionadas, eles são uma combinação de crocância e sabor em cada pedaço.', preco: 10.00, imagem: '/onionrings.webp' },
    { nome: 'Orange juice', description: 'Refrescante, 100% natural e feito na hora com laranjas selecionadas. A combinação perfeita de sabor e leveza para acompanhar seu lanche!', preco: 10.00, imagem: '/orangejuice.webp' },
    { nome: 'Pastel de queijo', description: 'Queijo mussarela. Massa artesanal, fina e crocante, dourada no ponto perfeito.', preco: 25.00, imagem: '/pastel.webp' },
    { nome: 'Pastel de queijo', description: 'Queijo mussarela. Massa artesanal, fina e crocante, dourada no ponto perfeito.', preco: 25.00, imagem: '/pastel.webp' },
    { nome: 'Pepsi', description: 'Clássica, gelada e refrescante. Acompanha perfeitamente qualquer lanche.', preco: 5.00, imagem: '/pepsi.webp' },
    { nome: 'Petit Gauteau', description: 'Sobremesa clássica e irresistível: bolinho de chocolate com casquinha crocante por fora e recheio cremoso por dentro, servido com uma bola de sorvete de creme. A combinação perfeita entre o quente e o gelado, que derrete na boca e conquista no primeiro pedaço!', preco: 35.00, imagem: '/petitgauteau.webp' },
    { nome: 'Pizza de calabresa', description: 'Massa fininha, molho de tomate natural, calabresa, mozzarella, cebola em rodelas, ovos cozidos, tomate em rodelas, azeitonas e azeite.', preco: 50.00, imagem: '/pizzacalabresa.webp' },
    { nome: 'Pizza de mozzarella', description: 'Massa fininha, molho de tomate natural, calabresa, mozzarella, cebola em rodelas, ovos cozidos, tomate em rodelas, azeitonas e azeite.', preco: 55.00, imagem: '/pizzamussarela.webp' },
    { nome: 'Quesadilla', description: 'Tortilla dourada na chapa, recheada com frango desfiado, queijo derretido e temperos especiais. Crocante por fora, cremosa por dentro — um sabor mexicano que vai te conquistar!', preco: 25.00, imagem: '/quesadilla.webp' },
    { nome: 'Triple burger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa.', preco: 65.00, imagem: '/tripleburger.webp' },
  ];

  todosProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.listar().subscribe(firebase => {
      this.produtosFirebase = firebase;
      this.todosProdutos = [...this.produtosFixos, ...firebase];
    });
  }

  cart: CardapioItem[] = [];
  isModalOpen = false;
  address = '';
  showAddressWarning = false;

  get total(): number {
    return this.cart.reduce((acc, item) => item.price * item.quantity, 0);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addToCart(name: string, price: number) {
    const existingItem = this.cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ name, price, quantity: 1 });
    }
  }

  removeItemCart(name: string) {
    const index = this.cart.findIndex(item => item.name === name);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  checkout() {
    if (this.cart.length === 0) return;

    if (!this.address.trim()) {
      this.showAddressWarning = true;
      return
    }

    const cartItems = this.cart.map(item => `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`).join(' | ');
    const phone = '5511996221043';
    const message = encodeURIComponent(cartItems + ` Endereço: ${this.address}`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    this.cart = [];
    this.address = '';
    this.showAddressWarning = false;
  }
}