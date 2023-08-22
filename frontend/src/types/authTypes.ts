// Interface for user stats
export interface IUserStats {
  likes: number;
  recipes: number;
  follows: number;
  followers: number;
  recipeLikes: number;
}

// Interface for user data being retrieved from MongoDB
export interface IUserDBData {
  _id: string;
  description: string;
  email: string;
  favorites: string[];
  name: string;
  displayName: string;
  private: boolean;
  recipes: string[];
  userId: string;
  newUser: boolean;
  stats: IUserStats;
}

export type SetUserProfileData = React.Dispatch<
  React.SetStateAction<IUserDBData | null>
>;
