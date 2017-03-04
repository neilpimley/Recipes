using Recipes.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recipes.Models
{
    public class RecipeDto : Recipe
    {
        public IEnumerable<Step> Steps { get; set;  }
        public IEnumerable<Ingredient> Ingredients { get; set; }

    }
}