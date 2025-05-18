import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedInKey = 'isLoggedIn';
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) { }
  login(username: string, password: string): boolean {
    if(username === 'admin' && password === '1234') {

      if(isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.isLoggedInKey, 'true');
      }
      return true;
    }
    return false;
  }

  logout(): void {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.isLoggedInKey);
    }
  }

  isLoggedIn(): boolean {
    if(isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    }
    return false;
  }
}