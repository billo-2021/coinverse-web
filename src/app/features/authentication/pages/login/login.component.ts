import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from "../../../../common/services";
import {LoginRequest} from "../../../../common/models";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected loginForm: FormGroup;

  public constructor(private formBuilder: FormBuilder,
                     private authenticationService: AuthenticationService) {

    this.loginForm = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    const loginRequest: LoginRequest = {
      username: 'admin@coinverse.com',
      password: '123'
    };

    this.authenticationService.login(loginRequest).subscribe((value) => {
      console.log('Res', value);
    });
  }
}
