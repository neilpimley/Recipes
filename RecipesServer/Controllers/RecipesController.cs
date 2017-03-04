using System.Linq;
using System.Web.Http;
using Recipes.DAL;
using System.Web.Http.Cors;
using Recipes.Interfaces;

namespace Recipes.Controllers
{
    [RoutePrefix("Api/Recipes")]
    [Authorize]
    // don't allow all origins in production, just for dev
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RecipesController : ApiController
    {
        IRecipesRepository _repository;

        public RecipesController(IRecipesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Recipes/
        public IQueryable<Recipe> GetRecipes()
        {
            return _repository.GetRecipes();
        }

        // GET: api/Recipes/47
        public IHttpActionResult GetRecipes(int id)
        {
            return Ok(_repository.GetRecipe(id)); 
        }

    }
}