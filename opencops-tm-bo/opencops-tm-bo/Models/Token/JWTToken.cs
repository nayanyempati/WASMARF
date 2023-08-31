namespace opencops_tm_bo.Models.Token
{
    public class JWTToken
    {
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;

    }
}
