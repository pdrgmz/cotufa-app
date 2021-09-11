import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService,private router: Router, public toasterService: ToastrService ) { }

  ngOnInit() {

    this.authService.eliminarToken();

    //Form inline validation iniciator
    (function () {
      'use strict'
    
      var forms = document.querySelectorAll('.needs-validation')

      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()

    
  }

  onRegister(form ): void{

    if(form.valid){

      this.authService.createUser(form.value).subscribe(response =>{
        this.router.navigateByUrl('/auth/login');

        this.toasterService.success(null, response.msg, { positionClass: 'toast-bottom-center' });
      })
    }
  
  }

}
