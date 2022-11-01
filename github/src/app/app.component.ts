import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { GhService } from './services/gh.service';
import { IUser } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'github';
  subscription: Subscription = new Subscription();
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',
      props: {
        placeholder: 'Search Github Username',
        required: true,
      },
    },
  ];

  users: IUser[] = [];
  user!: IUser;

  constructor(private ghService: GhService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(model: any) {
    console.log(model);
    this.searchUser(model);
  }

  searchUser(search: { search: string }) {
    this.subscription.add(
      this.ghService.searchUsers(search.search).subscribe({
        next: (res) => {
          this.user = res;
        },
        complete: () => {},
        error: () => {},
      })
    );
  }

  getUsers() {
    this.subscription.add(
      this.ghService.getUsers().subscribe({
        next: (res) => {
          this.users = res;
        },
        complete: () => {},
        error: () => {},
      })
    );
  }
}
