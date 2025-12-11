declare namespace Express {
  interface User {
    id: number;
    email: string;
    username: string;
  }

  interface Request {
    user?: User;
  }
}