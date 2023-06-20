import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./views/auth/pages/auth-page/auth-page.component').then(comp => comp.AuthPageComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./views/home/pages/home-page/home-page.component').then(comp => comp.HomePageComponent),
        canActivate: [authGuard],

    },
    {
        path: 'article/:id',
        loadComponent: () => import('./views/home/pages/single-view-page/single-view-page.component').then(comp => comp.SingleViewPageComponent)
    },
    {
        path: '**',
        redirectTo: '/auth'
    }
];
