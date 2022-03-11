import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
