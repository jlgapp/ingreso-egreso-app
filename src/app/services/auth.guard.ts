import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService : AuthService,
              private router : Router
    ){

  }
  canActivate():  Observable<boolean>  {

    return this.authService.isAuth().pipe(
      tap(estado => {
        if (!estado) this.router.navigate(['/login'])
      })
    );
  }
// con el canload es diferente al can activate en los childrens
// el can activate me abre los modulos sin aun estar aunteticado
// con el can load no, pero debemos poner el take 1 para cancelar
// las ubscripciones antertiores
  canLoad():  Observable<boolean>  {

    return this.authService.isAuth().pipe(
      tap(estado => {
        if (!estado) this.router.navigate(['/login'])
      }),
      take(1)
    );
  }

}
