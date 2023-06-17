import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/">Return to Homepage</Link>
    </>
  );
}

export default NotFound;
