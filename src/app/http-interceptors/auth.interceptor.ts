import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // if (req.headers.get('No-Auth') == "True")
        //     return next.handle(req.clone());
        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization",'Token '+localStorage.getItem('userToken')) //After Autorization make a space
            });
            return next.handle(clonedreq)
        }
        else {
            return next.handle(req.clone()) //this.router.navigateByUrl('/login');
        }
    }
}