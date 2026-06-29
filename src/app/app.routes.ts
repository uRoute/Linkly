import { authGuard } from './core/guard/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/components/auth-layout/auth-layout.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { MainLayoutComponent } from './core/layouts/components/main-layout/main-layout.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'' , component:AuthLayoutComponent,children:[
        {path:'login',component:LoginComponent,title:'Linkly | Login'},
        {path:'register',component:RegisterComponent,title:'Linkly | Register'}
    ]},
    {path:'' , component:MainLayoutComponent, canActivate:[authGuard] ,children:[
        {path:'home',loadComponent:()=> import('./features/components/home/home.component').then((c)=>c.HomeComponent) ,title:'Linkly | Home'},
        {path:'uer_profile',loadComponent:()=> import('./features/components/profile/profile.component').then((c)=>c.ProfileComponent) ,title:'Linkly | Profile'},
        // {path:'home',loadComponent:()=> import('./features/components/').then((c)=>c.HomeComponent) ,title:'Linkly | Home'},
        // {path:'home',loadComponent:()=> import('./features/components/home/home.component').then((c)=>c.HomeComponent) ,title:'Linkly | Home'},

    ]},
    {path:'**' , loadComponent: ()=> import('./shared/components/wildcard/wildcard.component').then((c)=> c.WildcardComponent) , title:'Linkly | 404' }
];
