import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
export class CardapioComponent {

  menuItems = [
    { name: 'Caesar Salad', description: 'Esse clássico, que combina croutons crocantes, alface fresquinha e molho cremoso, ganha o reforço do frango desfiado.', price: 20.00, image: '/caesarsalad.webp' },
    { name: 'Batata Frita', description: 'Nossas fritas com uma cobertura irresistível de mix de queijos e bacon. O toque final fica por conta do molho Ranch.', price: 25.00, image: '/frenchfries.webp' },
    { name: 'Onion Rings', description: 'Feitos com cebolas selecionadas, eles são uma combinação de crocância e sabor em cada pedaço.', price: 15.00, image: '/frenchfries.webp' },
    { name: 'Quesadilla de Frango', description: 'Uma deliciosa tortilha de trigo recheada com queijo derretido e frango desfiado e legumes. Levemente grelhada até ficar dourada e crocante por fora, e cremosa por dentro. Acompanha molho especial para mergulhar.', price: 30.00, image: '/quesadilla.webp' },
    { name: 'Cheeseburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa.', price: 40.00, image: '/cheeseburger.webp' },
    { name: 'Double Burger', description: 'Pão levinho de fermentação natural, burger 160g, bacon, queijo prato, maionese da casa, alface, tomate e cebola.', price: 45.00, image: '/hamburger.webp' },
    { name: 'Triple Burger', description: 'Pão levinho de fermentação natural, burger 160g, bacon, queijo prato, maionese da casa, alface, tomate e cebola.', price: 50.00, image: '/tripleburger.webp' },
    { name: 'Pastel de Bacalhau', description: 'Bacalhau refogado no alho, cebola e pimenta dedo-de-moça. Massa artesanal, fina e crocante, dourada no ponto perfeito.', price: 35.00, image: '/pastel.webp' },
    { name: 'Pastel de Carne', description: 'Patinho moído refogado no alho, cebola e pimenta dedo-de-moça. Massa artesanal, fina e crocante, dourada no ponto perfeito.', price: 55.00, image: '/pastelcarne.webp' },
    { name: 'Pizza de Mussarela', description: 'Massa fininha, molho de tomate natural, mozzarella, tomate em rodelas, azeitonas e azeite.', price: 30.00, image: '/pizzamussarela.webp' },
    { name: 'Pizza Portuguesa', description: 'Massa fininha, molho de tomate natural, calabresa, mozzarella, cebola em rodelas, ovos cozidos, tomate em rodelas, azeitonas e azeite.', price: 55.00, image: '/pizzacalabresa.webp' },
    { name: 'Petit Gauteau', description: 'Um irresistível bolinho de chocolate com casquinha crocante por fora e recheio cremoso e quente por dentro. Servido com uma bola de sorvete de creme, criando o contraste perfeito entre quente e frio.', price: 40.00, image: '/petitgauteau.webp' },
    { name: 'Coca cola', description: 'Refrescante, clássica e cheia de sabor, a Coca-Cola é a escolha perfeita para acompanhar qualquer refeição. Seu sabor inconfundível e borbulhante traz uma explosão de frescor a cada gole.', price: 10.00, image: '/pepsi.webp' },
    { name: 'Suco de Laranja', description: 'Refrescante e cheio de sabor, nosso suco de laranja é preparado na hora com frutas selecionadas, sem conservantes. A escolha perfeita para acompanhar sua refeição com leveza e saúde', price: 10.00, image: '/orangejuice.webp' },
  ];

  cart: CardapioItem[] = [];
  isModalOpen = false;
  address = '';
  showAddressWarning = false;

  get total(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
      this.cart.push({ name, price, quantity: 1});
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
      return;
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


