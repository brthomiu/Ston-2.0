import GuestButton from './GuestButton';
import LoginButton from './LoginButton';

export default function DesktopIntroCard() {
  return (
    <section className="absolute left-[15%] top-[15%] hidden z-20 lg:w-[480px] lg:flex">
      <div className="flex flex-col max-w-[100%] p-8 bg-ston-green bg-opacity-70 rounded-xl lg:w-[100%] lg:mb-[50%]">
        <h1 className="ml-4 text-left text-ston-yellow2 font-bold">Stön</h1>
        <h2 className="ml-4 text-left text-ston-yellow1 font-bold">
          Recipe Notes
        </h2>
        <h3 className="mt-3 mb-4 ml-4 text-left text-ston-yellow2 font-bold">
          Cook • Share • Learn
        </h3>
        <LoginButton />
        <GuestButton />
      </div>
    </section>
  );
}
