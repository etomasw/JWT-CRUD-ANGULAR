import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
  }

  public onRegister(user: User): void {
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.email = this.email;
    user.password = this.password;
    user.phone = this.phone;
    console.log('Registered user: ' + user.firstName + " " + user.lastName);
    this.subscriptions.push(
      this.authService.register(user).subscribe(
        (response: User) => {
          console.log('User created!');
        },
        (errorResponse: HttpErrorResponse) => {
          console.log('Error');
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
