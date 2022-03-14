import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre?: string = '';
  userSubs!: Subscription;
  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(usr => usr != null)
      )
      .subscribe(({ user }) => this.nombre = user?.nombre)
  }

  logOut() {

    Swal.fire({
      title: 'Espere por favor',
      //timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.logAuth()
      .then(() => {
        Swal.close();
        this.router.navigate(['/login']);

      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      });
  }

}
