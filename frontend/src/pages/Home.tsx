import GuestButton from '../components/home/GuestButton';
import HomeAbout1 from '../components/home/HomeAbout1';
import HomeAbout2 from '../components/home/HomeAbout2';
import HomeIntro from '../components/home/HomeIntro';
import LoginButton from '../components/home/LoginButton';
import { useIntroduction, useRedirectHome } from '../hooks/authHooks';

function Home() {
  // Redirects new users to intro page
  useIntroduction();
  // Redirects users who are logged in to the dashboard
  useRedirectHome();

  return (
    <>
      <div className="fixed z-10 left-0 top-0 w-[100%] h-[100%] h-fill bg-ston-brown lg:w" />
      <div className="absolute flex flex-col left-0 top-0 z-20 gap-8 lg:w-[100%]">
        <HomeIntro />
        <div className="bg-ston-brown -mt-12 -mb-24 pb-24 pt-12 lg:hidden">
          <LoginButton />
          <GuestButton />
        </div>

        <HomeAbout1 />
        <HomeAbout2 />
      </div>
    </>
  );
}

export default Home;
