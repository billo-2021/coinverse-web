import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MappingPair } from '@dynamic-mapper/mapper';
import { Mapper } from '@dynamic-mapper/angular';

import { Filter, HttpCrudService, PageRequest, PageResponse } from '../../../core';

import { apiPageRequestToken, apiRoutesConfig } from '../../config';
import { ApiRoutesConfigType } from '../../types';
import { MapperUtils } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class ApiCrudClient {
  constructor(
    private readonly _httpService: HttpCrudService,
    @Inject(apiPageRequestToken) private readonly _pageRequestToken: PageRequest,
    private readonly _mapper: Mapper
  ) {}

  public find<TDto = unknown, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find<TDto>(apiRoutesConfig[pathName])
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findOne<TDto extends object | string | number | boolean, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    id: string,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find<TDto>(this.withId(pathName, id))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findOneBy<TDto extends object | string | number | boolean, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    filter: Filter,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find<TDto>(this.withFilter(pathName, filter))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findMany<TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    pageRequest: PageRequest = this._pageRequestToken,
    mappingPair?: MappingPair<PageResponse<TDto>, PageResponse<TResponse>>
  ): Observable<PageResponse<TResponse>> {
    return this._httpService
      .find<PageResponse<TDto>>(this.withPageRequest(pathName, pageRequest))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findManyBy<TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    filters: Filter[],
    pageRequest: PageRequest = this._pageRequestToken,
    mappingPair?: MappingPair<PageResponse<TDto>, PageResponse<TResponse>>
  ): Observable<PageResponse<TResponse>> {
    return this._httpService
      .find<PageResponse<TDto>>(this.withFiltersPageRequest(pathName, filters, pageRequest))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findAll<TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse[]> {
    return this._httpService
      .find<TDto[]>(apiRoutesConfig[pathName])
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findAllBy<TDto, TResponse>(
    pathName: ApiRoutesConfigType,
    filter: Filter,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse[]> {
    return this._httpService
      .find<TDto[]>(this.withFilter(pathName, filter))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public create<TRequest, TDto = unknown, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .create<TRequest, TDto>(apiRoutesConfig[pathName], data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public update<TRequest, TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .update<TRequest, TDto>(apiRoutesConfig[pathName], data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public patch<TRequest, TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .patch<TRequest, TDto>(apiRoutesConfig[pathName], data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public patchBy<TRequest, TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    id: string,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .patch<TRequest, TDto>(this.withId(pathName, id), data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public remove<TDto, TResponse = TDto>(
    pathName: ApiRoutesConfigType,
    id: string,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .remove<TDto>(this.withId(pathName, id))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  private withId(pathName: ApiRoutesConfigType, id: string): string {
    return `${apiRoutesConfig[pathName]}/${id}`;
  }

  private withPageRequest(pathName: ApiRoutesConfigType, pageRequest: PageRequest): string {
    return `${apiRoutesConfig[pathName]}?${this.getQueryFromPageRequest(pageRequest)}`;
  }

  private withFiltersPageRequest(
    pathName: ApiRoutesConfigType,
    filters: Filter[],
    pageRequest: PageRequest
  ): string {
    return `${apiRoutesConfig[pathName]}?${this.getFilterQueryFromFilters(
      filters
    )}&${this.getQueryFromPageRequest(pageRequest)}`;
  }

  private withFilter(pathName: ApiRoutesConfigType, filter: Filter): string {
    return `${apiRoutesConfig[pathName]}?${this.getQueryFromFilter(filter)}`;
  }

  private getQueryFromPageRequest(pageRequest: PageRequest): string {
    return `pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
  }

  private getFilterQueryFromFilters(filters: Filter[]): string {
    return filters.map((filter) => this.getQueryFromFilter(filter)).join('&');
  }

  private getQueryFromFilter(filter: Filter): string {
    return (Object.keys(filter) as Array<keyof Filter>).reduce(
      (acc: string, key, index) =>
        index === 0 ? `${String(key)}=${filter[key]}` : `${acc}&${String(key)}=${filter[key]}`,
      ''
    );
  }

  private mapApiResponse<TDto, TResponse>(
    response: TDto,
    mappingPair?: MappingPair<TDto, TResponse>
  ): TResponse;

  private mapApiResponse<TDto, TResponse>(
    response: TDto[],
    mappingPair?: MappingPair<TDto, TResponse>
  ): TResponse[];

  private mapApiResponse<TDto, TResponse>(
    response: PageResponse<TDto>,
    mappingPair?: MappingPair<PageResponse<TDto>, PageResponse<TResponse>>
  ): PageResponse<TResponse>;

  private mapApiResponse<TDto, TResponse>(
    response: TDto | TDto[] | PageResponse<TDto>,
    mappingPair?: MappingPair<TDto | PageResponse<TDto>, TResponse | PageResponse<TResponse>>
  ): TResponse | TResponse[] | PageResponse<TResponse> {
    if (!mappingPair) {
      return MapperUtils.apiResponseMapper(response);
    }

    return this._mapper.map(mappingPair, response);
  }
}
