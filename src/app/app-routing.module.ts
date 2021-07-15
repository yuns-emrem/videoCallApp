import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [

      {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/authorization/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/authorization/register/register.module').then(m => m.RegisterPageModule)
      },
    ]

  },
  {
    path: 'content',
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/content/users/users.module').then(m => m.UsersPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
