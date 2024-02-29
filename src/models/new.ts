import { HttpResponse, PaginationResponse } from '@/types/common';

export interface NewCategory {
  id: number;
  name: string;
  nameEn: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface New {
  id: number;
  title: string;
  titleEn: string;
  categoryId?: number;
  type?: number;
  content?: string;
  contentEn?: string;
  description?: string;
  descriptionEn?: string;

  category?: NewCategory;
  startAt?: string;
  endAt?: string;
  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

export class NewResponse {
  id: number;
  title: string;
  titleEn: string;
  category?: NewCategory;
  startAt?: string;

  constructor(props?: New) {
    this.id = props?.id ?? 0;
    this.category = props?.category ?? undefined;
    this.title = props?.title ?? '';
    this.titleEn = props?.titleEn ?? '';
  }
}

export type NewsResponse = HttpResponse<{
  news: NewResponse[];
  paging: PaginationResponse;
}>;

export class NewDetail {
  id: number;
  type: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  description: string;
  descriptionEn: string;
  category?: NewCategory;
  startAt?: string;

  constructor(props?: New) {
    this.id = props?.id ?? 0;
    this.type = props?.type ?? 0;
    this.title = props?.title ?? '';
    this.titleEn = props?.titleEn ?? '';
    this.content = props?.content ?? '';
    this.contentEn = props?.contentEn ?? '';
    this.description = props?.description ?? '';
    this.descriptionEn = props?.descriptionEn ?? '';
    this.category = props?.category ?? undefined;
  }
}

export type NewDetailResponse = HttpResponse<{
  news: NewDetail;
}>;
