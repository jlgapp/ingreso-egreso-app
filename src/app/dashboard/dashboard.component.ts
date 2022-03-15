import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  ingresoEgresosSubs!: Subscription;
  constructor(private store: Store<AppState>,
    private ingresoEgresoServices: IngresoEgresoService) { }


  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe((usr) => {

        this.ingresoEgresosSubs = this.ingresoEgresoServices.initIngresosEgresosListener(usr.user?.uid)
          .subscribe(ingresosEgresosFb => {
            this.store.dispatch(setItems({ items: ingresosEgresosFb }))
          })
      }
      );
  }

  ngOnDestroy(): void {
    this.ingresoEgresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
