import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'cardapio', component: CardapioComponent },
    { path: 'login', component: LoginComponent},
    { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
