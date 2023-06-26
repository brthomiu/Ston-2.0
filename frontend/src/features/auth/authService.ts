/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user/';

// Interface for user data being handled by the client
export interface IUserData {
  data: {
    userId: string;
    name: string;
    email: string;
  };
}

// Sync user profile
export const syncProfile = async () => {
  // Get user auth object from backend
  const userData: IUserData = await axios.get(API_URL);
  console.log(`Client login function userData: ${JSON.stringify(userData)}`);
  if (!userData.data.userId) {
    throw Error('Could not authenticate user.');
  }

  // Post user auth object to sync with database
  const response = await axios.post(API_URL, userData.data);

  console.log(`Client login function response: ${response.data}`);
};
