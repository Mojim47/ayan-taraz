export interface Content {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: Category;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Article extends Content {
  excerpt: string;
  tags: string[];
}
