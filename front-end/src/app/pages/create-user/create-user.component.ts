import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phone: string;


  constructor(private service: UserService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    const user = new User();
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.email = this.email;
    user.phone = this.phone;
    user.password = this.password;
    this.authService.register(user).subscribe(
      data => {
        console.log('Created');
      }, 
      error => {
        console.log(error);
      }
    );
  }

}
