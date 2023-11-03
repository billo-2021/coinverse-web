import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {HttpOptions, HttpOptionsBuilder} from '../../types/http-options';
import {apiBaseUrlToken, httpHeadersConfigToken} from '../../config';
import {ObjectUtils} from '../../utils';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {StorageKey} from '../../constants';

interface Credentials {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpCrudService {
  private readonly headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
              @Inject(apiBaseUrlToken) private readonly baseUrl: string,
              @Inject(httpHeadersConfigToken) private readonly httpHeadersConfig: Record<string, string | number>,
              @Inject(LocalStorageService) private readonly localStorage: LocalStorageService
  ) {
    this.headers = new HttpHeaders(httpHeadersConfig);
  }

  public buildOptions(params?: HttpParams): HttpOptions {
    const credentials = this.localStorage.get<Credentials>(StorageKey.USER_CREDENTIALS);

    const headers = new HttpHeaders({'Authorization': `Bearer ${credentials?.accessToken}`});

    const httpOptionsBuilder = new HttpOptionsBuilder();
    httpOptionsBuilder.addHeaders(headers);

    if (ObjectUtils.isObject(params)) {
      httpOptionsBuilder.addParams(params);
    }

    return httpOptionsBuilder.build();
  }

  public find<TResponse = void>(path: string): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient
      .get<TResponse>(url, options);
  }

  public create<TRequest, TResponse = void>(path: string, data?: TRequest): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.post<TResponse>(url, data, options);
  }

  public update<TRequest, TResponse = void>(path: string, data?: TRequest): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.put<TResponse>(url, data, options);
  }

  public patch<TRequest, TResponse = void>(path: string, data?: TRequest): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.patch<TResponse>(url, data, options);
  }

  public remove<TResponse = void>(path: string): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.delete<TResponse>(url, options);
  }

  private getUrl(path: string): string {
    return `${this.baseUrl}${path}`
  }
}
