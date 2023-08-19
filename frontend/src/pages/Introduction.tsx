/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { endIntroduction } from '../features/authService';
import { useNoIntroduction } from '../hooks/authHooks';

export default function Introduction() {
  // Redirect users who have already completed the introduction
  useNoIntroduction();

  const navigate = useNavigate();

  const handleEndIntroduction = async () => {
    const userId = localStorage.getItem('userId');
    console.log('component userId: ', userId);
    if (userId) {
      const handleEnd = async (user: string) => {
        endIntroduction(user);
        localStorage.setItem('newUser', 'false');
        navigate('/');
      };

      await handleEnd(userId);
    }
  };

  return (
    <div>
      NewUser
      <button type="button" onClick={() => handleEndIntroduction()}>
        Finish Introduction
      </button>
    </div>
  );
}
