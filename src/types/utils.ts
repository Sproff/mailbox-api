export type CustomError = Error & {
  statusCode?: number;
};

export type TokenPayload = {
  _id: string;
  name: string;
  email: string;
};
