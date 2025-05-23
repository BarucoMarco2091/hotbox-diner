import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <h2>Login do Administrador</h2>
      <form (ngSubmit)="login()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Senha" required>
        <button type="submit">Entrar</button>
      </form>
      <p *ngIf="erro">{{ erro }}</p>
    </div>
  `,
  styles: [`
    .login-container { padding: 2rem; max-width: 500px; margin: auto; height: 50dvh;}
    .form input { display: block; margin: 0.5rem 0; width: 100%; }
    .form button { margin-top: 0.5rem; }
  `]
})

export class LoginComponent {
    email = '';
    password = '';
    erro = '';

    constructor(private auth: AuthService, private router: Router) {}

    login() {
        this.auth.login(this.email, this.password)
        .then(() => this.router.navigate(['/admin']))
        .catch(err => this.erro = 'Credenciais inválidas');
    }
}