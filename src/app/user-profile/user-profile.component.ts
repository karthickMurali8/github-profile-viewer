import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GithubUsersServiceService } from '../github-users-service/github-users-service.service';
import { Subscription } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: gitHubUser;
  routeParamMap: Subscription = new Subscription();
  getUsersService: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private gitHubUsersService: GithubUsersServiceService
  ) {
    this.user = this.getUserObject();
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.routeParamMap.unsubscribe();
    this.getUsersService.unsubscribe();
  }

  getUser() {
    this.routeParamMap = this.route.paramMap.subscribe({
      next: (res: ParamMap) => {
        this.getUsersService = this.gitHubUsersService.getUser(res.get('userName') || '').subscribe({
          next: (res) => { this.user = this.getUserObject(res); console.log(res) },
          error: () => {}
        });
      }
    });
  }

  getUserObject(res?: any): gitHubUser {
    return {
      avatar_url: res?.avatar_url ?? '',
      name: res?.name ?? '',
      company: res?.company ?? '',
      blog: res?.blog ?? '',
      location: res?.location ?? '',
      email: res?.email ?? '',
      bio: res?.bio ?? '',
      public_repos: res?.public_repos ?? '',
      followers: res?.followers ?? '',
      following: res?.following ?? '',
    };
  }

}

export interface gitHubUser {
  avatar_url: string | null,
  name: string | null,
  company: string | null,
  blog: string | null,
  location: string | null,
  email: string | null,
  bio: string | null,
  public_repos: number | null,
  followers: number | null,
  following: number | null,
}
