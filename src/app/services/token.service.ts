import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private storage: { [key: string]: string } = {};

    constructor() {}

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

    getToken(): string | null {
        if (this.isBrowser()) {
            return localStorage.getItem(this.TOKEN_KEY);
        } else {
            return this.storage[this.TOKEN_KEY] || null;
        }
    }

    setToken(token: string): void {
        if (this.isBrowser()) {
            localStorage.setItem(this.TOKEN_KEY, token);
        } else {
            this.storage[this.TOKEN_KEY] = token;
        }
    }

    removeToken(): void {
        if (this.isBrowser()) {
            localStorage.removeItem(this.TOKEN_KEY);
        } else {
            delete this.storage[this.TOKEN_KEY];
        }
    }
}
