using Recipes.DAL;
using Recipes.Interfaces;
using Recipes.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.SqlServer;
using System.Linq;

namespace Recipes.Repositories
{
    public class RecipesRepository : IDisposable, IRecipesRepository
    {
        private RecipesEntities db = new RecipesEntities();

        public RecipeDto GetRecipe(int id)
        {
            return (from r in db.Recipes
                    where r.Id == id
                    select new RecipeDto
                    {
                        Id = r.Id,
                        Name = r.Name,
                        DiffLevel = r.DiffLevel,
                        Description = r.Description,
                        PhotoUrl = r.PhotoUrl,
                        PrepTime = r.PrepTime,
                        CreatedDate = r.CreatedDate,
                        DisplayDate = SqlFunctions.StringConvert((double)
                                        SqlFunctions.DatePart("m", r.CreatedDate)).Trim() + "/" +
                                        SqlFunctions.DateName("dd", r.CreatedDate) + "/" +
                                SqlFunctions.DateName("yyyy", r.CreatedDate),
                        Steps = db.Steps.Where(s => s.RecipeId == r.Id),
                        Ingredients = db.Ingredients.Where(s => s.RecipeId == r.Id)
                    }).FirstOrDefault();
        }
        public IQueryable<Recipe> GetRecipes()
        {
            return db.Recipes.OrderBy(r => r.CreatedDate);
        }

        public Recipe UpdateRecipe(int id, Recipe recipe)
        {
    
            db.Entry(recipe).State = EntityState.Modified;
                db.SaveChanges();

            return recipe;
        }

        public Recipe AddRecipe(Recipe recipe)
        {
            recipe.CreatedDate = DateTime.Now;
            db.Recipes.Add(recipe);
            db.SaveChanges();

            return recipe;
        }

        public void DeleteRecipe(int id)
        {
            Recipe Recipe = db.Recipes.Find(id);
            if (Recipe != null)
            {
                db.Recipes.Remove(Recipe);
                db.SaveChanges();
            }
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private bool RecipeExists(int id)
        {
            return db.Recipes.Count(e => e.Id == id) > 0;
        }
    }

}