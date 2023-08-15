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
}

export type SetUserProfileData = React.Dispatch<
  React.SetStateAction<IUserDBData | null>
>;
