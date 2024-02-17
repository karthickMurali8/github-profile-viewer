import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
// 
export const routes: Routes = [
    { path: 'users/:userName', component: UserProfileComponent },
];
