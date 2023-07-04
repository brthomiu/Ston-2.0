/* eslint-disable no-console */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCreateRecipe } from '../../features/recipeService';
import TagForm from './TagForm';
import { IRecipeProps } from '../../types/recipeTypes';
import IngredientEntry from './IngredientEntry';

function RecipeForms() {
  // Initialize navigate
  const navigate = useNavigate();
  // Get username from local storage
  const userName = sessionStorage.getItem('userName') as string;

  // State to hold tag list
  const [tagList, setTagList] = useState<string[]>([]);

  // State to hold ingredient list (added to recipe object on submit)
  const [ingredientList, setIngredientList] = useState<
    IRecipeProps['ingredientList']
  >([]);

  // State to hold recipe data
  const [formData, setFormData] = useState({
    owner: userName,
    recipeName: '',
    ingredients: ingredientList,
    recipeBody: '',
    likers: [],
    images: [],
    tags: tagList,
  });

  // Function to handle form string input
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipeData = {
      owner: userName,
      recipeName: formData.recipeName,
      ingredients: ingredientList,
      recipeBody: formData.recipeBody,
      likers: formData.likers,
      images: formData.images,
      tags: tagList,
    };
    try {
      await handleCreateRecipe(recipeData);
      console.log('formData.ingredients: ', formData.ingredients);
      navigate('/recipes');
    } catch (error) {
      // Submission failed, stay on CreateRecipe page
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <section>
      <form autoComplete="off" onSubmit={onSubmit}>
        {/* Recipe name entry section */}
        <div>
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
        <div>
          <IngredientEntry
            ingredientList={ingredientList}
            setIngredientList={setIngredientList}
          />
          <TagForm tagList={tagList} setTagList={setTagList} />
        </div>
        {/* Recipe body entry section */}
        <div>
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
  );
}

export default RecipeForms;
