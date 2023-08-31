using System.Security.Cryptography;
using System.Text;
namespace opencops_tm_bo.Helper
{
    public class Cryptography
    {

        public string HashPassword(string password)
        {
            var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var salt = config["Salt"];
            return CreateSaltedHash(password, salt);
        }


        public static string CreateSaltedHash(string password, string salt)
        {
            using (var sha512 = SHA512.Create())
            {
                byte[] saltBytes = Encoding.UTF8.GetBytes(salt);
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

                byte[] saltedPassword = new byte[saltBytes.Length + passwordBytes.Length];
                Array.Copy(saltBytes, saltedPassword, saltBytes.Length);
                Array.Copy(passwordBytes, 0, saltedPassword, saltBytes.Length, passwordBytes.Length);

                byte[] hash = sha512.ComputeHash(saltedPassword);

                return Convert.ToBase64String(hash);
            }
        }
    }
}
