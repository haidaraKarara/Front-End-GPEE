import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 

    constructor() { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // if (req.headers.get('No-Auth') == "True")
        //     return next.handle(req.clone());
        if (localStorage.getItem('userToken') != null) {
            // console.log('yup')
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization",'Token '+localStorage.getItem('userToken'))//After Autorization make a space
            });
            return next.handle(clonedreq)
        }
        else {
            // console.log("GREAT btoa")
            // const clonedreq = req.clone({
            //     setHeaders: {
            //         Authorization: "Basic " + btoa("toto:passer1234")
            //        // headers: req.headers.set("Authorization",'Basic') //After Autorization make a space
            //     }
            // });
            return next.handle(req.clone()) //this.router.navigateByUrl('/login');
        }
    }
}