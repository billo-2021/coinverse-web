import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponseMapperError, HttpCrudService, PageRequest, PageResponse } from '../../../core';

import { MapperUtils } from '../../utils';
import { apiPageRequestToken } from '../../config';
import { ApiResponseMapper, ApiRoutesConfigType } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiCrudClient {
  constructor(
    private readonly _httpService: HttpCrudService,
    @Inject(apiPageRequestToken) private readonly _pageRequestToken: PageRequest
  ) {}

  public find<TDto, TResponse = TDto>(
    path: ApiRoutesConfigType,
    mapper?: ApiResponseMapper<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find(path)
      .pipe(map((response) => this.mapApiResponse(response, mapper)));
  }

  public findOne<TDto extends object | string | number | boolean, TResponse = TDto>(
    path: ApiRoutesConfigType,
    id: string,
    mapper?: ApiResponseMapper<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find(this.withId(path, id))
      .pipe(map((response) => this.mapApiResponse(response, mapper)));
  }

  public findMany<
    TDto extends Array<unknown> | PageResponse<unknown>,
    TResponse extends Array<unknown> | PageResponse<unknown> = TDto,
  >(
    path: ApiRoutesConfigType,
    pageRequest: PageRequest = this._pageRequestToken,
    mapper?: ApiResponseMapper<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find(this.withPageRequest(path, pageRequest))
      .pipe(map((response) => this.mapApiResponse(response, mapper)));
  }

  public update<TRequest, TDto, TResponse = TDto>(
    path: ApiRoutesConfigType,
    data?: TRequest,
    mapper?: ApiResponseMapper<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .update(path, data)
      .pipe(map((response) => this.mapApiResponse(response, mapper)));
  }

  public patch<TRequest, TDto, TResponse = TDto>(
    path: ApiRoutesConfigType,
    data?: TRequest,
    mapper?: ApiResponseMapper<TDto, TResponse>
  ): Observable<unknown> {
    return this._httpService
      .patch(path, data)
      .pipe(map((response) => this.mapApiResponse(response, mapper)));
  }

  public remove<TDto, TResponse = TDto>(
    path: ApiRoutesConfigType,
    id: string,
    mapper?: ApiResponseMapper<TDto, TResponse>
  ): Observable<unknown> {
    return this._httpService
      .remove(this.withId(path, id))
      .pipe(map((response) => this.mapApiResponse(response, mapper)));
  }

  private withId(path: ApiRoutesConfigType, id: string): string {
    return `${path}/${id}`;
  }

  private withPageRequest(path: ApiRoutesConfigType, pageRequest: PageRequest): string {
    return `${path}?pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
  }

  private mapApiResponse<TDto, TResponse>(
    response: unknown,
    mapper: ApiResponseMapper<TDto, TResponse> = MapperUtils.apiResponseMapper<TDto, TResponse>()
  ): TResponse {
    if (!mapper.validate) {
      return mapper.map(response);
    }

    const validationResult = mapper.validate(response);

    if (!validationResult.isValid) {
      throw new ApiResponseMapperError(validationResult.expected, JSON.stringify(response));
    }

    return mapper.map(validationResult.response);
  }
}
