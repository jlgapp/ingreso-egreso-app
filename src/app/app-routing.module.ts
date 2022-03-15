import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path:'',
    //canActivate: [AuthGuard], // con este me reconoce que no estoy logueado pero me carha los modulos ej ing y egreso cuando le pongo la url de la ruta principal
    canLoad : [AuthGuard], // con este no carga el modulo aun cuando llame al dasboard o ruta principal
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m=> m.IngresoEgresoModule)
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      //preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      relativeLinkResolution: 'legacy',
      // useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
