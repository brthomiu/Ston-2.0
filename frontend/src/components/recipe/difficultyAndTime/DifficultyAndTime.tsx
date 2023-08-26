import { IRecipe } from '../../../types/recipeTypes';

function DifficultyAndTime({ difficulty, time }: IRecipe) {
  // Render the ingredient
  return (
    <>
      <p>Difficulty: {difficulty}</p>
      <p>Minutes: {time.minutes}</p>
      <p>Hours: {time.hours}</p>
    </>
  );
}

export default DifficultyAndTime;
