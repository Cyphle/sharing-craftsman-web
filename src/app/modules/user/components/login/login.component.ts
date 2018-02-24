import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { Login } from '../../forms/login.form';
import { UserService } from '../../services/user.service';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AccessToken } from '../../models/access-token.model';
import { COOKIES } from '../../../../config/keys.config';
import { Instant } from '../../../../utils/instant';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public model: Login;
  public submitted: boolean;
  public errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.model = new Login();
    this.submitted = false;
  }

  onSubmit() { this.submitted = true; }

  login() {
    this.userService
    .login(this.model.username, this.model.password, this.model.persistentLogging)
    .subscribe(response => this.handleLoginResponse(response.body));
  }

  private handleLoginResponse(token: AccessToken) {
    const instant = new Instant();
    this.cookieService.setCookie(COOKIES.username, token.username, instant.getISODateFromTimestamp(token.expirationDate));
    this.cookieService.setCookie(COOKIES.token, token.accessToken, instant.getISODateFromTimestamp(token.expirationDate));
    this.cookieService.setCookie(COOKIES.refreshToken, token.refreshToken, instant.getISODateFromTimestampWithDelay(token.expirationDate, 2));
  }
}
