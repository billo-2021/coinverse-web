import {HttpHeaders, HttpParams} from "@angular/common/http";

interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

class HttpOptionsBuilder {
  private headers?: HttpHeaders;
  private params?: HttpParams;

  public constructor() {
  }

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
      params: this.params
    }
  }
}

export {HttpOptions, HttpOptionsBuilder};
