import DashboardButton from './DashboardButton';
import ProfileButton from './ProfileButton';
import RecipesButton from './RecipesButton';
import CreateRecipeButton from './CreateRecipeButton';
import LoginButton from './LoginButton';

export default function NavButtonRow() {
  return (
    <div className="lg:flex lg:flex-row hidden gap-12 ">
      <DashboardButton /> <RecipesButton /> <CreateRecipeButton />
      <ProfileButton /> <LoginButton />
    </div>
  );
}
