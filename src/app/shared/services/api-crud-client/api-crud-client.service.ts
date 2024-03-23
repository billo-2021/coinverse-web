import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MappingPair } from '@dynamic-mapper/mapper';
import { Mapper } from '@dynamic-mapper/angular';
import { ApiConfig, ApiRequestFilter, PageRequest, PageResponse } from '../../types';
import { MapperUtils } from '../../utils';
import { ApiRoute } from '../../enums';
import { API_CONFIG_TOKEN, PAGE_REQUEST_TOKEN } from '../../tokens';
import { HttpCrudService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class ApiCrudClient {
  constructor(
    @Inject(PAGE_REQUEST_TOKEN) private readonly _pageRequest: PageRequest,
    @Inject(API_CONFIG_TOKEN) private readonly _apiConfig: ApiConfig,
    private readonly _httpService: HttpCrudService,
    private readonly _mapper: Mapper
  ) {}

  public find<TDto = unknown, TResponse = TDto>(
    path: ApiRoute,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find<TDto>(path)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findOne<TDto extends object | string | number | boolean, TResponse = TDto>(
    path: ApiRoute,
    id: string,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find<TDto>(this.withId(path, id))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findOneBy<TDto extends object | string | number | boolean, TResponse = TDto>(
    path: ApiRoute,
    filter: ApiRequestFilter,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .find<TDto>(this.withFilter(path, filter))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findMany<TDto, TResponse = TDto>(
    path: ApiRoute,
    pageRequest: PageRequest = this._pageRequest,
    mappingPair?: MappingPair<PageResponse<TDto>, PageResponse<TResponse>>
  ): Observable<PageResponse<TResponse>> {
    return this._httpService
      .find<PageResponse<TDto>>(this.withPageRequest(path, pageRequest))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findManyBy<TDto, TResponse = TDto>(
    path: ApiRoute,
    filters: ApiRequestFilter[],
    pageRequest: PageRequest = this._pageRequest,
    mappingPair?: MappingPair<PageResponse<TDto>, PageResponse<TResponse>>
  ): Observable<PageResponse<TResponse>> {
    return this._httpService
      .find<PageResponse<TDto>>(this.withFiltersPageRequest(path, filters, pageRequest))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findAll<TDto, TResponse = TDto>(
    path: ApiRoute,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse[]> {
    return this._httpService
      .find<TDto[]>(path)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public findAllBy<TDto, TResponse>(
    path: ApiRoute,
    filter: ApiRequestFilter,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse[]> {
    return this._httpService
      .find<TDto[]>(this.withFilter(path, filter))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public create<TRequest, TDto = unknown, TResponse = TDto>(
    path: ApiRoute,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .create<TRequest, TDto>(path, data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public update<TRequest, TDto, TResponse = TDto>(
    path: ApiRoute,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .update<TRequest, TDto>(path, data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public patch<TRequest, TDto, TResponse = TDto>(
    path: ApiRoute,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .patch<TRequest, TDto>(path, data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public patchBy<TRequest, TDto, TResponse = TDto>(
    path: ApiRoute,
    id: string,
    data?: TRequest,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .patch<TRequest, TDto>(this.withId(path, id), data)
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  public remove<TDto, TResponse = TDto>(
    path: ApiRoute,
    id: string,
    mappingPair?: MappingPair<TDto, TResponse>
  ): Observable<TResponse> {
    return this._httpService
      .remove<TDto>(this.withId(path, id))
      .pipe(map((response) => this.mapApiResponse(response, mappingPair)));
  }

  private withId(path: ApiRoute, id: string): string {
    return `${path}/${id}`;
  }

  private withPageRequest(path: ApiRoute, pageRequest: PageRequest): string {
    return `${path}?${this.getQueryFromPageRequest(pageRequest)}`;
  }

  private withFiltersPageRequest(
    path: ApiRoute,
    filters: ApiRequestFilter[],
    pageRequest: PageRequest
  ): string {
    return `${path}?${this.getFilterQueryFromFilters(filters)}&${this.getQueryFromPageRequest(
      pageRequest
    )}`;
  }

  private withFilter(path: ApiRoute, filter: ApiRequestFilter): string {
    return `${path}?${this.getQueryFromFilter(filter)}`;
  }

  private getQueryFromPageRequest(pageRequest: PageRequest): string {
    return `pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
  }

  private getFilterQueryFromFilters(filters: ApiRequestFilter[]): string {
    return filters.map((filter) => this.getQueryFromFilter(filter)).join('&');
  }

  private getQueryFromFilter(filter: ApiRequestFilter): string {
    return (Object.keys(filter) as Array<keyof ApiRequestFilter>).reduce(
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
