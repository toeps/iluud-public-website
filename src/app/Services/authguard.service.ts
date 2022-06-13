import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate , CanLoad , CanActivateChild {

  constructor(private router: Router, 
    private  localservice:StorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let url = state.url;
   return this.checkLogin(url);
 }
 CanDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   let url = state.url;
   return this.checkLogin(url);
 }

 canLoad(route: Route): boolean {
   let url =route.path;
   return this.checkLogin(url);
 }

 canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
   return this.canActivate(route, state);  
 }


 
 checkLogin(url: string){
   if(this.localservice.getItem('acesstoken') && url =='/auth'){
       console.log("checkloginnnnnnnnnnnnnnnnnnn",url)
     this.router.navigate(['/'])
     return false;
   }
   if(this.localservice.getItem('acesstoken')&& url !='/auth'){
       console.log("deactivateeeeeeee",url)
     return true
     ;
   }
  
   if(this.localservice.getItem('acesstoken')){
     return true;
   }
   console.log("checkloginnnnnnnnnnnnnnnnnnn",url,"=============")
   this.router.navigate(['/auth'],{queryParams: {attemptedUrl:url}});
   return false;
 }
}
