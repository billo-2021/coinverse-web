import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  private completedRequests = 0;

  constructor(private loader: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;

        if (this.completedRequests === this.totalRequests) {
          this.loader.hide();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }
      })
    );
  }
}
