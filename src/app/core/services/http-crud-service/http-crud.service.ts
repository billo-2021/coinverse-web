import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ObjectUtils } from '../../utils';
import { HttpOptions, HttpOptionsBuilder } from '../../types';
import { apiBaseUrlToken, httpHeadersConfigToken } from '../../config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { StorageKey } from '../../constants';

interface Credentials {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpCrudService {
  private readonly headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    @Inject(apiBaseUrlToken) private readonly baseUrl: string,
    @Inject(httpHeadersConfigToken)
    private readonly httpHeadersConfig: Record<string, string | number>,
    @Inject(LocalStorageService)
    private readonly localStorage: LocalStorageService
  ) {
    this.headers = new HttpHeaders(httpHeadersConfig);
  }

  public buildOptions(params?: HttpParams): HttpOptions {
    const credentials = this.localStorage.get<Credentials>(StorageKey.USER_CREDENTIALS);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${credentials?.accessToken}`,
    });

    const httpOptionsBuilder = new HttpOptionsBuilder();
    httpOptionsBuilder.addHeaders(headers);

    if (ObjectUtils.isObject(params)) {
      httpOptionsBuilder.addParams(params);
    }

    return httpOptionsBuilder.build();
  }

  public find(path: string): Observable<unknown> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.get<unknown>(url, options);
  }

  public create<TRequest>(path: string, data?: TRequest): Observable<unknown> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.post<unknown>(url, data, options);
  }

  public update<TRequest>(path: string, data?: TRequest): Observable<unknown> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.put<unknown>(url, data, options);
  }

  public patch<TRequest>(path: string, data?: TRequest): Observable<unknown> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.patch<unknown>(url, data, options);
  }

  public remove(path: string): Observable<unknown> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.delete<unknown>(url, options);
  }

  private getUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
