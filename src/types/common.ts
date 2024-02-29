import HttpStatusCode from '@/types/http-status-code';

export interface HttpResponse<T> {
  currentValidatorsList: any;
  statusCode: HttpStatusCode;
  message: string;
  data: T;
}

export interface PaginationRequest {
  page: number;
  pageSize?: number;
}

export interface PaginationResponse {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPage: number;
}
