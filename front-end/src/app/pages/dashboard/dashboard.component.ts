import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users: User[];
  private subscriptions: Subscription[] = [];

  constructor(private service: UserService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUsers();
    if(this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public getUsers(): void {
    this.subscriptions.push(
      this.service.getUsers().subscribe(
        (response: User[]) => {
          this.users = response;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        }
      )
    );
  }

  public deleteUser(id: number): void {
    this.subscriptions.push(
      this.service.deleteUser(id).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log('error al eliminar');
        }
      )
    );
    this.router.navigate(['/dashboard']);
  }

  public onLogOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
    console.log('Logged out!');
  }

}
