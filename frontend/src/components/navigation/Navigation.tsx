import CreateRecipeButton from './CreateRecipeButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ProfileButton from './ProfileButton';
import RecipesButton from './RecipesButton';

function Navigation() {
  return (
    <nav>
      <h1>Navbar!</h1>
      <LoginButton />
      <LogoutButton />
      <RecipesButton />
      <CreateRecipeButton />
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
