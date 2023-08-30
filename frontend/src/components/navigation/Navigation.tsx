import { useState } from 'react';
import CreateRecipeButton from './CreateRecipeButton';
import DashboardButton from './DashboardButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ProfileButton from './ProfileButton';
import RecipesButton from './RecipesButton';

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  return (
    <nav className="fixed z-20 top-0 left-0 w-full h-16 bg-ston-green">
      <div className="fixed left-4 top-4 text-ston-tan text-xl">
        Ston Recipe Notes
      </div>
      {showMenu && (
        <div className="fixed flex flex-col gap-4 p-4 w-full mt-16 bg-ston-green lg:w-96 lg:right-0">
          <DashboardButton />
          <RecipesButton />
          <CreateRecipeButton />
          <ProfileButton />
          <LoginButton />
          <LogoutButton />
        </div>
      )}
      {!showMenu && (
        <button
          type="button"
          className="fixed right-0 rotate-90 scale-y-[1.75] text-2xl text-ston-tan"
          onClick={() => handleShowMenu()}
        >
          | | |
        </button>
      )}
      {showMenu && (
        <button
          type="button"
          className="fixed right-[6px] -top-1 scale-x-[1.5] text-3xl"
          onClick={() => handleShowMenu()}
        >
          X
        </button>
      )}
    </nav>
  );
}

export default Navigation;
