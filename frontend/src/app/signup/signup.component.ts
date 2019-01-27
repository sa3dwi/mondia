import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({
    templateUrl: 'signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.signUpForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        });
    }

    // getter for easy access to form fields
    get formControls() { return this.signUpForm.controls; }

    onSubmit() {
        // stop if form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        this.loading = true;

        // set username and password
        const userInfo = {
          name: this.formControls.name.value,
          username: this.formControls.username.value,
          password: this.formControls.password.value
        };

        this.authenticationService.signUp(userInfo)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
