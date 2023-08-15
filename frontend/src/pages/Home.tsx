import { useIntroduction } from '../hooks/authHooks';

function Home() {
  // Redirects new users to intro page
  useIntroduction();

  return (
    <div>
      <h1>Howdy planet.</h1>
    </div>
  );
}

export default Home;
