import DashboardButton from './DashboardButton';
import RecipesButton from './RecipesButton';
import CreateRecipeButton from './CreateRecipeButton';
import LoginButton from './LoginButton';
import DesktopProfileButton from './DesktopProfileButton';

export default function NavButtonRow() {
  return (
    <div className="lg:flex lg:flex-row hidden gap-12 ">
      <DashboardButton /> <RecipesButton /> <CreateRecipeButton />
      <DesktopProfileButton /> <LoginButton />
    </div>
  );
}
