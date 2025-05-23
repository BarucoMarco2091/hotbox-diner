import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { LoginComponent } from './admin/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'cardapio', component: CardapioComponent },
    { path: 'login', component: LoginComponent},
    { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
