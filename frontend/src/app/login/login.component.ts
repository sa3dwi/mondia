import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;
    error = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to Home '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // getter for easy access to form fields
    get formControls() { return this.loginForm.controls; }

    onSubmit() {
        // stop if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        // set username and password
        const userLogin = {
          username: this.formControls.username.value,
          password: this.formControls.password.value
        };

        this.authenticationService.login(userLogin)
            .pipe(take(1))
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
