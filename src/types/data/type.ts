export enum TagCategorySeq {
  POSITIVE = '1',
  NEGATIVE = '2',
  ETC = '3',
}

export interface tag {
  modDate: string;
  regDate: string;
  seq: string;
  tagCategory: {
    seq: TagCategorySeq;
    modDate: string;
    regDate: string;
    tagCategoryCode: string;
    tagCategoryName: string;
  };
  tagCategorySeq: TagCategorySeq;
  tagCode: string;
  tagName: string;
}

export interface diary {
  calenderYn: string;
  contents: string;
  modDate: string;
  regDate: string;
  seq: string;
  tags: diaryTag[];
  title: string;
  writerSeq: string;
}

export interface diaryTag {
  diarySeq: string;
  modDate: string;
  regDate: string;
  seq: string;
  tag: tag;
  tagSeq: string;
  writerSeq: number;
}

// redux data type

export interface emotion {
  emotion: tag[];
  checkedEmotion: tag[];
  error: string | undefined;
  status: string;
}

export interface note {
  title: string;
  content: string;
  date: string;
}
