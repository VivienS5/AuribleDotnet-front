export interface Book {
  idBook: number;
  title: string;
  resume: string;
  coverURL: string;
  audioPath: string;
  maxPage: number;
  author: string;
  chapters: Chapter[];
}

interface Chapter {
  idChapter: number;
  chapterTitle: string;
  timecode: string[];
  page: number;
  idBook_FK: number;
  book: string;
}
