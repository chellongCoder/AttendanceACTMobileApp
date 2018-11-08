export interface Admin {
  username: string;
  password: string;
}

export interface Response {
  message: string;
  data: Array<{}>;
}

export interface Staff {
  staffId: string;
  staffName: string;
  courseId: string;
  email: string;
  numberPhone: string;
  avatarUrl: string;
}
