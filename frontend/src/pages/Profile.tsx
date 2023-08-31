/* eslint-disable no-console */
import {
  useFetchProfile,
  useRedirect,
  useIntroduction,
  useFetchProfileRecipes,
} from '../hooks/authHooks';
import Loader from '../components/Loader';
import LogoutButton from '../components/navigation/LogoutButton';

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
    <div className="w-fit">
      <h2>Profile</h2>
      <h3>Name: {userProfileData.name}</h3>
      <h3>Description: {userProfileData.description}</h3>
      <h3>Favorites: {userProfileData.favorites}</h3>
      <LogoutButton />
    </div>
  );
}

export default Profile;
