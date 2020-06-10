import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';




@Injectable()
export class LanguageInterceptorService implements HttpInterceptor {
    currentLang: string = 'fr';

    constructor() {
     }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.currentLang = localStorage.getItem('lang');
     
        const modifiedReq = req.clone({
            // headers: new HttpHeaders().append('language', this.currentLang)
        });

        return next.handle(modifiedReq);
    }
}
