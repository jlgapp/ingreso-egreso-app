import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoEgresoSubs!: Subscription;

  constructor(private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
        console.log('detail', this.ingresosEgresos)
      });
  }
  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
  }

  borrar(uid?: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Borrado', 'Item Borrado', 'success'))
      .catch(err => Swal.fire('Borrado', err.message, 'error'));
  }

}
