import { Component, OnInit } from '@angular/core';
import { GithubUsersServiceService } from '../github-users-service/github-users-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss'
})
export class RepositoriesComponent implements OnInit {
  routeParamMap: Subscription = new Subscription();
  getUsersService: Subscription = new Subscription();

  repos: any[] = [];

  constructor(
    private userService: GithubUsersServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.routeParamMap = this.route.paramMap.subscribe({
      next: (res: ParamMap) => {
        this.getUsersService = this.userService.getUser(res.get('userName') || '').subscribe({
          next: (res: any) => { 
            this.getRepos(res.repos_url);
           },
          error: () => {}
        });
      }
    });
  }

  getRepos(url: string) {
    this.userService.getRepos(url).subscribe({
      next: (res) => { this.repos = res },
      error: () => {}
    });
  }

}
