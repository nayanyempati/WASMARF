using opencops_tm_bo.Helper;
using opencops_tm_bo.Validations;
using System.ComponentModel.DataAnnotations;

namespace opencops_tm_bo.Models.Account
{
    public class Login
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email Address.")]
        public string Email { get; set; } = null!;
        [Required(ErrorMessage = "Password is required.")]
        [PasswordValidation(ErrorMessage="Invalid Credentials")]
        public string Password { get; set; } = null!;
        [Required(ErrorMessage = "Captcha is required.")]
        [CaptchaValidations(ErrorMessage = "Invalid captcha.")]
        public string Captcha { get; set; } = null!;
    }
}
