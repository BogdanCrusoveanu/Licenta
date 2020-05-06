import { Router } from '@angular/router';
import { User } from './../_models/user';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  userDate: Date
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm('Student');
    // console.log(this.registerForm.get('firstName').errors)
    // console.log(this.registerForm.get('firstName').touched)
  }
  
  createRegisterForm(role) {
    this.registerForm = this.fb.group({
      role: [role],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      year: [''],
      specialization: [''],
      group: [''],
      subGroup: [''],
      password: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true}
  }

  register() {
    if(this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      if(this.registerForm.get('role').value == "Profesor") {
        this.user.year = 0;
      }
      console.log(this.user);
      this.userDate = this.registerForm.get('dateOfBirth').value
      this.user.userName = this.user.firstName + this.user.lastName + this.userDate.getDay();
      this.authService.register(this.user).subscribe( () => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      // }, () => {
      //   this.authService.login(this.user).subscribe(() => {
      //     this.router.navigate(['/members']);
      //   });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}