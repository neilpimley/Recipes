//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Recipes.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Ingredient
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public string Description { get; set; }
    }
}