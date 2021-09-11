import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private authService: AuthService,private router: Router) { }

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

  onLogin(form): void{

    if(form.valid){
      this.authService.generateToken(form.value).subscribe(response =>{
        if(response){
          this.router.navigateByUrl('/movies/home');
        }
      })
    }
    

  }

}
