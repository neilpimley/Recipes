using Recipes.DAL;
using Recipes.Models;
using System.Linq;

namespace Recipes.Interfaces
{
    public interface IRecipesRepository
    {
        RecipeDto GetRecipe(int id);
        IQueryable<Recipe> GetRecipes();
        Recipe AddRecipe(Recipe recipe);
        Recipe UpdateRecipe(int id, Recipe recipe);
    }     
       
}