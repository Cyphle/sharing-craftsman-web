import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { Login } from '../../forms/login.form';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public model: Login;
  public errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.model = new Login();
  }

  register() {
    this.userService
      .register(this.model.username, Md5.hashStr(this.model.password).toString())
      .subscribe(
        response => this.handleRegistrationResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private handleRegistrationResponse(response) {
    this.router.navigateByUrl(`/login`);
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur lors de la création de compte : ${error.statusText}`;
  }
}
