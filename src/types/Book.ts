export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy: string;
  updatedBy?: string;
  deletedBy?: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedMessage?: string;
}

export interface Book extends BaseEntity {
  title: string;
  author: string;
  year: number;
  genre: string;
  isRead: boolean;
  attachmentId?: string;
}

export type BookFormData = Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'updatedBy' | 'deletedBy' | 'isDeleted' | 'deletedMessage' | 'attachmentId'>;
