/* eslint-disable no-console */
import { useState } from 'react';
import { createRecipe } from '../features/recipeService';

function CreateRecipe() {
  // Get username from local storage
  const userName = sessionStorage.getItem('userName') as string;
  // State to hold recipe data
  const [formData, setFormData] = useState({
    owner: userName,
    recipeName: 'Test Recipe',
    ingredients: [],
    recipeBody: 'This is a test',
    likers: [],
    image: '',
  });

  // Function to handle form string input
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipeData = {
      owner: userName,
      recipeName: formData.recipeName,
      ingredients: formData.ingredients,
      recipeBody: formData.recipeBody,
      likers: formData.likers,
      image: formData.image,
    };
    console.log('CreateRecipe onSubmit recipeData:', recipeData);
    createRecipe(recipeData);
  };

  return (
    <div>
      <div>
        <h2>New Recipe</h2>
        <br />
      </div>
      <section className="form">
        <form autoComplete="off" onSubmit={onSubmit}>
          {/* Recipe name entry section */}
          <div className="form-group">
            <textarea
              maxLength={40}
              rows={3}
              cols={40}
              name="recipeName"
              value={formData.recipeName}
              placeholder="Name your recipe."
              onChange={onChange}
            />
          </div>
          {/* Ingredient entry section */}
          <div className="form-group">
            <textarea
              maxLength={300}
              rows={3}
              cols={40}
              name="ingredients"
              value={formData.ingredients}
              placeholder="Enter ingredients separated by commas."
              onChange={onChange}
            />
          </div>
          {/* Recipe body entry section */}
          <div className="form-group">
            <textarea
              maxLength={3000}
              rows={5}
              cols={40}
              id="recipeBody"
              name="recipeBody"
              value={formData.recipeBody}
              placeholder="Add your recipe."
              onChange={onChange}
            />
          </div>
          {/* Recipe submission button */}
          <div />
          <button type="submit">Create Recipe</button>
        </form>
      </section>
    </div>
  );
}

export default CreateRecipe;