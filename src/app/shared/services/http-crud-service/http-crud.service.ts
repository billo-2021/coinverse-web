import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ApiConfig, HttpOptions, HttpOptionsBuilder } from '../../types';
import { StorageKey } from '../../enums';
import { API_CONFIG_TOKEN } from '../../tokens';
import { ObjectUtils } from '../../utils';
import { LocalStorageService } from '../local-storage/local-storage.service';

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
    @Inject(API_CONFIG_TOKEN) private readonly _apiConfig: ApiConfig,
    @Inject(LocalStorageService)
    private readonly _localStorage: LocalStorageService
  ) {
    this.headers = new HttpHeaders(_apiConfig.httpHeaders);
  }

  public buildOptions(params?: HttpParams): HttpOptions {
    const credentials = this._localStorage.get<Credentials>(StorageKey.USER_CREDENTIALS);

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

  public find<TResponse = unknown>(path: string): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.get<TResponse>(url, options).pipe(shareReplay());
  }

  public create<TRequest, TResponse = void>(path: string, data?: TRequest): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.post<TResponse>(url, data, options).pipe(shareReplay());
  }

  public update<TRequest, TResponse = void>(path: string, data?: TRequest): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.put<TResponse>(url, data, options).pipe(shareReplay());
  }

  public patch<TRequest, TResponse = void>(path: string, data?: TRequest): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.patch<TResponse>(url, data, options).pipe(shareReplay());
  }

  public remove<TResponse = void>(path: string): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = this.buildOptions();

    return this.httpClient.delete<TResponse>(url, options).pipe(shareReplay());
  }

  private getUrl(path: string): string {
    return `${this._apiConfig.baseUrl}${path}`;
  }
}
