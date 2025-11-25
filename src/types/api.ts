

export interface Result {
  code: number;
  message: string;
  success: boolean;
}

export interface ResultData<T> extends Result {
  data: T;
}

export interface ResultList<T> extends Result {

  data: {
    list: T[];
    total: number;
  };
}
