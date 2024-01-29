import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
  readonly headers?: HttpHeaders;
  readonly params?: HttpParams;
}

export class HttpOptionsBuilder {
  private headers?: HttpHeaders;
  private params?: HttpParams;

  public addHeaders(headers: HttpHeaders): HttpOptionsBuilder {
    this.headers = headers;
    return this;
  }

  public addParams(params: HttpParams): HttpOptionsBuilder {
    this.params = params;
    return this;
  }

  public build(): HttpOptions {
    return {
      headers: this.headers,
      params: this.params,
    };
  }
}
