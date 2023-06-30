import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ProfileButton from './ProfileButton';
import RecipesButton from './RecipesButton';
import { useSyncProfile } from '../hooks/authHooks';

function Navigation() {
  // Sync with database
  useSyncProfile();

  return (
    <nav>
      <h1>Navbar!</h1>
      <LoginButton />
      <LogoutButton />
      <RecipesButton />
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
