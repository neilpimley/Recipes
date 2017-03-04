using Recipes.DAL;
using Recipes.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recipes.Repositories
{
    public class BasketRepository : IDisposable, IBasketRepository
    {
        private RecipesEntities db = new RecipesEntities();
        public IQueryable<Ingredient> GetBasketItems(int userId)
        {
            return (from i in db.Ingredients
                    join b in db.Baskets on i.Id equals b.IngredientId
                    where b.UserId == userId
                    select i);
        }

        public Basket GetBasket(int userId, int ingredientId)
        {
            return db.Baskets.Where(b => b.UserId == userId && b.IngredientId == ingredientId).FirstOrDefault();
        }

        public void AddToBasket(int userId, int recipeId)
        {
            var ingredients = db.Ingredients.Where(i => i.RecipeId == recipeId).ToList();
            foreach (var item in ingredients)
            {
                db.Baskets.Add(new Basket { IngredientId = item.Id, UserId = userId });
                db.SaveChanges();
            }
        }

        public void RemoveFromBasket(Basket basket)
        {
            db.Baskets.Remove(basket);
            db.SaveChanges();
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

        
    }
}