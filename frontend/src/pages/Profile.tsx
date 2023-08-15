/* eslint-disable no-console */
import {
  useFetchProfile,
  useRedirect,
  useIntroduction,
  useFetchProfileRecipes,
} from '../hooks/authHooks';
import Loader from '../components/Loader';

function Profile() {
  // Redirect users who aren't logged in / new users
  useRedirect();
  useIntroduction();

  // Fetch user profile data
  const userProfileData = useFetchProfile();

  // Fetch user recipe list
  const userRecipes = useFetchProfileRecipes();

  console.log(userRecipes);

  // Returns loading until profile data loads
  if (!userProfileData) {
    return (
      <>
        <h1>Profile</h1>
        <Loader />
      </>
    );
  }

  // Return user profile.
  return (
    <>
      <h1>Profile</h1>
      <h2>Name: {userProfileData.name}</h2>
      <h2>Description: {userProfileData.description}</h2>
      <h2>Favorites: {userProfileData.favorites}</h2>
    </>
  );
}

export default Profile;
