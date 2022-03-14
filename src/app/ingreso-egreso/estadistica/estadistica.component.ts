import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {


  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;
  estadisticaSub! : Subscription;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      //{ data: [ 350, 450 ] },
      { data: [ ] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }
  

  ngOnInit(): void {
    this.estadisticaSub = this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadisticas(items));
  }

  ngOnDestroy(): void {
    this.estadisticaSub.unsubscribe();    
  }

  generarEstadisticas(items: IngresoEgreso[]) {
    this.totalIngresos=0;
    this.ingresos =0;
    this.totalEgresos = 0;
    this.egresos=0;
    
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData.datasets[0].data = [this.totalIngresos, this.totalEgresos];
  }
  

}
