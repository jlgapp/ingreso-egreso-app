import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private authServices: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authServices.user.uid;

    delete ingresoEgreso.uid;
    
    return this.fireStore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });

  }

  initIngresosEgresosListener(uid?: string) {
    /*this.fireStore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map (doc => {
          return {   uid: doc.payload.doc.id,
                    ...doc.payload.doc.data() as any            
          }
        })
      })
    )
    .subscribe( something => console.log('ing_egrSome', something));*/

    return this.fireStore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        )
        )
      );
  }

  borrarIngresoEgreso(uidItem? : string) {
    const uid = this.authServices.user.uid;
    return this.fireStore.doc(`${uid}/ingresos-egresos/items/${uidItem}`)
    .delete();
  }




}
