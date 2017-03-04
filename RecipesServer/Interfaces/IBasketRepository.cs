using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recipes.Interfaces
{
    public interface IBasketRepository
    {
        void AddToBasket(int UserId, int IngreadietId);

        void RemoceFromBasket(int UserId, int IngreadietId);
    }
}