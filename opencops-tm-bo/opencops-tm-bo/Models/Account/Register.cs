using opencops_tm_bo.Validations;
using System.ComponentModel.DataAnnotations;

namespace opencops_tm_bo.Models.Account
{
    public class Register
    {
        [Required(ErrorMessage = "First Name is required.")]
        public string FirstName { get; set; } = null!;
        [Required(ErrorMessage = "Last Name is required.")]
        public string LastName { get; set; } = null!;
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email Address.")]
        public string Email { get; set; } = null!;
        [Required(ErrorMessage = "Password is required.")]
        [PasswordValidation(ErrorMessage = "Password should contain atleast 12 characters including alpha numeric and special characters")]
        public string Password { get; set; } = null!;
        [Required(ErrorMessage = "Company Name is required.")]
        public string CompanyName { get; set; } = null!;

        [Required(ErrorMessage = "Captcha is required.")]
        [CaptchaValidations(ErrorMessage = "Invalid captcha.")]
        public string Captcha { get; set; } = null!;

        [Required(ErrorMessage = "Agreements is required.")]
        public bool Agreements { get; set; }
    }
}
