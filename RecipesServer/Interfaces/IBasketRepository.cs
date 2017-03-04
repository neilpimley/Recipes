using Recipes.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recipes.Interfaces
{
    public interface IBasketRepository
    {
        IQueryable<Ingredient> GetBasketItems(int userId);
        void AddToBasket(int userId, int recipeId);
        void RemoveFromBasket(Basket basket);
        Basket GetBasket(int userId, int ingredient);
    }
}