import { useIntroduction, useRedirect } from '../hooks/authHooks';

function Dashboard() {
  // Redirects new users to intro page
  useIntroduction();
  // Redirect users not logged in to the Welcome page
  useRedirect();

  return (
    <div className="absolute top-24 left-0 w-full">
      <div className="flex flex-col gap-12 mb-24 lg:w-[720px] lg:m-auto">
        <div>
          <h2 className="mb-4">Welcome</h2>
          <div className="bg-ston-yellow1 rounded-2xl text-ston-brown">
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
          </div>
        </div>

        <div>
          <h2 className="mb-4">Pinecone</h2>
          <div className="bg-ston-yellow2 rounded-2xl text-ston-brown">
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
          </div>
        </div>

        <div>
          <h2 className="mb-4">Armband</h2>
          <div className="bg-ston-yellow1 rounded-2xl text-ston-brown">
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
            Spoodie <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
