using Recipes.DAL;
using Recipes.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recipes.Repositories
{
    public class UserRepository : IDisposable, IUserRepository
    {
        private RecipesEntities db = new RecipesEntities();

        public User GetUser(string username)
        {
            return db.Users.Where(u => u.Email == username).FirstOrDefault();
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