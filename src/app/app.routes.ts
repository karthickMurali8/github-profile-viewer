import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RepositoriesComponent } from './repositories/repositories.component';
// 
export const routes: Routes = [
    { path: 'users/:userName', 
        children: [
            {
                path: '',
                component: UserProfileComponent,
                pathMatch: 'full'
            },
            {
                path: 'repositories',
                component: RepositoriesComponent
            }
        ]
    },
];
