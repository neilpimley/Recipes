using Recipes.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recipes.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        public void AddToBasket(int UserId, int IngreadietId)
        {
        }

        public void RemoceFromBasket(int UserId, int IngreadietId)
        {
        }
    }
}