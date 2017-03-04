using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Recipes.Controllers;
using Recipes.DAL;
using Recipes.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Http.Routing;

namespace Recipes.Tests
{
    class RecipeUnitTest
    {
        IRecipesRepository _repository;

        [TestMethod]
        public void GetReturnsRecipeWithSameId()
        {
            // Arrange
            var mockRepository = new Mock<IRecipesRepository>();
            mockRepository.Setup(x => x.GetRecipe(12))
                .Returns(new Recipe { Id = 12});

            var controller = new RecipesController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetRecipes(12);
            var contentResult = actionResult as OkNegotiatedContentResult<Recipe>;

            // Assert
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(12, contentResult.Content.Id);
        }
    }
}
