import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { ViewComponent } from './view';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegisterComponent, canActivate: [AuthGuard]  },
    { path: 'visualizar/:id', component: ViewComponent, canActivate: [AuthGuard]  },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);