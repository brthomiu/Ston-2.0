/* eslint-disable no-console */
import { endIntroduction } from '../features/authService';
import { useNoIntroduction } from '../hooks/authHooks';

export default function Introduction() {
  // Redirect users who have already completed the introduction
  useNoIntroduction();

  const handleEndIntroduction = async () => {
    const userId = localStorage.getItem('userId');
    console.log('component userId: ', userId);
    if (userId) {
      await endIntroduction(userId);
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
