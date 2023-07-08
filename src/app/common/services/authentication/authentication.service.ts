import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";

import {HttpCrudService} from "../../../core/services";
import {LoginRequest, LoginResponse} from "../../models";
import {isLoginDto, LoginDto} from "../../models/authentication/login-dto.model";
import {routesConfig} from '../../config';
import {loginDtoToLoginResponse} from "../../mappers";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public readonly BASE_PATH = routesConfig.authentication;
  public readonly LOGIN_PATH = routesConfig.login;

  constructor(private httpService: HttpCrudService) {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpService.create<LoginRequest, LoginDto>(
      this.getFullPath(this.LOGIN_PATH), loginRequest, isLoginDto)
      .pipe(map(loginDtoToLoginResponse));
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}
