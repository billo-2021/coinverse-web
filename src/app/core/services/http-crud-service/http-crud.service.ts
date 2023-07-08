import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {HttpOptions, HttpOptionsBuilder} from "../../types/http-options";
import {baseUrlToken, httpHeadersConfig} from "../../config/service.config";
import {ValueTypeIs} from "../../types/when";
import {Nullable} from "../../types/nullable";

@Injectable({
  providedIn: 'root'
})
export class HttpCrudService {
  public static readonly HEADERS: HttpHeaders = new HttpHeaders(httpHeadersConfig);

  constructor(private httpClient: HttpClient,
              @Inject(baseUrlToken) private baseUrl: string
  ) {
  }

  public static buildOptions(params?: HttpParams): HttpOptions {
    const httpOptionsBuilder = new HttpOptionsBuilder();
    httpOptionsBuilder.addHeaders(this.HEADERS);

    Nullable.andThen((param) => {
      httpOptionsBuilder.addParams(param);
    }, params);

    return httpOptionsBuilder.build();
  }

  public find<TResponse>(path: string, valueTypeIs?: ValueTypeIs<TResponse>): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = HttpCrudService.buildOptions();

    return Nullable.isNone(valueTypeIs) ?
      this.httpClient
        .get<TResponse>(url, options) :
      this.httpClient
        .get<unknown>(this.getUrl(path), HttpCrudService.buildOptions())
        .pipe(map((response) => this.mapResponseToType(response, valueTypeIs)));
  }

  public create<TRequest, TResponse>(path: string, data: TRequest, valueTypeIs?: ValueTypeIs<TResponse>): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = HttpCrudService.buildOptions();

    return Nullable.isNone(valueTypeIs) ?
      this.httpClient.post<TResponse>(url, data, options) :
      this.httpClient.post<unknown>(url, data, options)
        .pipe(map((response) => this.mapResponseToType(response, valueTypeIs)));
  }

  public update<TRequest, TResponse>(path: string, data: TRequest, valueTypeIs?: ValueTypeIs<TResponse>): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = HttpCrudService.buildOptions();

    return Nullable.isNone(valueTypeIs) ?
      this.httpClient.put<TResponse>(url, data, options) :
      this.httpClient.put<unknown>(url, data, options)
        .pipe(map((response) => this.mapResponseToType(response, valueTypeIs)));
  }

  public patch<TRequest, TResponse>(path: string, data: TRequest, valueTypeIs?: ValueTypeIs<TResponse>): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = HttpCrudService.buildOptions();

    return Nullable.isNone(valueTypeIs) ?
      this.httpClient.patch<TResponse>(url, data, options) :
      this.httpClient.patch<unknown>(url, data, options)
        .pipe(map((response) => this.mapResponseToType(response, valueTypeIs)));
  }

  public remove<TResponse>(path: string, valueTypeIs?: ValueTypeIs<TResponse>): Observable<TResponse> {
    const url = this.getUrl(path);
    const options = HttpCrudService.buildOptions();

    return Nullable.isNone(valueTypeIs) ?
      this.httpClient.delete<TResponse>(url, options) :
      this.httpClient.delete<unknown>(url, options)
        .pipe(map((response) => this.mapResponseToType(response, valueTypeIs)));
  }

  private getUrl(path: string): string {
    return `${this.baseUrl}${path}`
  }

  private mapResponseToType<T>(response: unknown, valueTypeIs: ValueTypeIs<T>): T {
    if (!valueTypeIs(response)) {
      throw new Error("Mapping exception");
    }

    return response;
  }
}
