using Recipes.DAL;

namespace Recipes.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string username);
    }
}