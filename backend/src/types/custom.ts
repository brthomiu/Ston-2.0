export type User = {
  name: string;
  email: string;
  password: string;
  description: string;
  private: boolean;
  recipes: string[];
  favorites: string[];
};
