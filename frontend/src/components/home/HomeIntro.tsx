/* eslint-disable jsx-a11y/media-has-caption */
import mobileIntroVideo from '../../assets/stonWelcomeBG.mp4';
import DesktopIntroCard from './DesktopIntroCard';

export default function HomeIntro() {
  return (
    <section className="relative z-50 lg:w-[100%]">
      <div className="flex flex-col max-w-[100%] pt-4 pb-4 bg-ston-green lg:w-[100%] lg:mb-[50%]">
        <h1 className="ml-4 text-left text-ston-yellow2 font-bold lg:hidden">
          Stön
        </h1>
        <h2 className="ml-4 text-left text-ston-yellow1 font-bold lg:hidden">
          Recipe Notes
        </h2>
        <video
          className="w-[100%] my-4 lg:absolute lg:-mt-4 lg:z-0"
          autoPlay
          loop
          muted
        >
          <source src={mobileIntroVideo} type="video/mp4" />
        </video>
        <h3 className="-mt-2 text-ston-yellow2 font-bold lg:hidden">
          Cook • Share • Learn
        </h3>
        <DesktopIntroCard />
      </div>
    </section>
  );
}
