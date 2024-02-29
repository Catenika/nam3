import { HttpResponse } from '@/types/common';

export interface Faq {
  id: number;
  faqCategoryId: number;
  name: string;
  nameEn: string;
  content: string;
  contentEn: string;

  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

export class FaqResponse {
  id: number;
  faqCategoryId: number;
  name: string;
  nameEn: string;
  content: string;
  contentEn: string;

  constructor(props?: Faq) {
    this.id = props?.id ?? 0;
    this.faqCategoryId = props?.faqCategoryId ?? 0;
    this.name = props?.name ?? '';
    this.nameEn = props?.nameEn ?? '';
    this.content = props?.content ?? '';
    this.contentEn = props?.contentEn ?? '';
  }
}

export type FaqsResponse = HttpResponse<{
  faqs: FaqResponse[];
}>;

export interface FaqCategory {
  id: number;
  name: string;
  nameEn: string;
  faqs: Pick<Faq, 'id' | 'name' | 'nameEn'>[];

  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

export class FaqCategoryResponse {
  id: number;
  name: string;
  nameEn: string;
  faqs: Pick<Faq, 'id' | 'name' | 'nameEn'>[];

  constructor(props?: FaqCategory) {
    this.id = props?.id ?? 0;
    this.name = props?.name ?? '';
    this.nameEn = props?.nameEn ?? '';
    this.faqs = props?.faqs ?? [];
  }
}

export type FaqCategoriesResponse = HttpResponse<{
  faqCategories: FaqCategoryResponse[];
}>;
