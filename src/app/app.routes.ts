import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { DetailComponent } from './features/detail/detail.component';
import { CompareComponent } from './features/compare/compare.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'compare', component: CompareComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: '**', redirectTo: '' }
];
