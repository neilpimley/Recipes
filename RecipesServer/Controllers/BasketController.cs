using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Recipes.DAL;
using System.Web.Http.Cors;
using Recipes.Interfaces;

namespace Recipes.Controllers
{
    [RoutePrefix("Api/Recipes")]
    [Authorize]
    // don't allow all origins in production, just for dev
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BasketController : ApiController
    {
        IBasketRepository _repository;
        IUserRepository _userRepository;

        public BasketController(IBasketRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        // GET: api/Basket
        public IQueryable<Ingredient> GetBaskets()
        {
            var username = User.Identity.Name;
            var user = _userRepository.GetUser(username);
            return _repository.GetBasketItems(user.Id);
        }


        // POST: api/Basket
        [ResponseType(typeof(List<Ingredient>))]
        public IHttpActionResult PostBasket(int recipeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var username = User.Identity.Name;
            var user = _userRepository.GetUser(username);
            _repository.AddToBasket(user.Id, recipeId);

            return Ok();
        }

        // DELETE: api/Basket/5
        [ResponseType(typeof(Basket))]
        public IHttpActionResult DeleteFromBasket(int ingredientId)
        {
            _repository.RemoveFromBasket(new Basket { });

            return Ok();
        }

    }
}