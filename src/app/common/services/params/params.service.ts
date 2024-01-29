import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable()
export class ParamsService {
  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  public queryParam(param: string): Observable<string> {
    return this._activatedRoute.queryParams.pipe(
      map((params) => params[param] as string | undefined),
      filter((param): param is string => typeof param === 'string')
    );
  }

  public param(param: string): Observable<string | null> {
    return this._activatedRoute.params.pipe(
      map((params) => (typeof params[param] === 'string' ? (params[param] as string) : null))
    );
  }
}
