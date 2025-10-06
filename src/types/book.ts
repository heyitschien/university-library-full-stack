export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number; // 0..5, may be float like 4.5
  coverUrl: string;
  coverColor?: string;
  description?: string;
  totalCopies: number;
  availableCopies: number;
  videoUrl?: string;
  summary?: string;
};

export type BooksResponse = Book[];
