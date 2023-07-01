import { useFetchProfile, useRedirect } from '../hooks/authHooks';
import Loader from '../components/Loader';

function Profile() {
  // Redirect users who aren't logged in
  useRedirect();

  // Fetch user profile data
  const userProfileData = useFetchProfile();

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
      <h2>Recipes: {userProfileData.recipes}</h2>
      <h2>Favorites: {userProfileData.favorites}</h2>
    </>
  );
}

export default Profile;
