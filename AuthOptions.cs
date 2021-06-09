using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace library
{
    public class AuthOptions
    {
        public const string ISSUER = "LibraryAuthServer"; // издатель токена
        public const string AUDIENCE = "LibraryAuthClient"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 60; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}