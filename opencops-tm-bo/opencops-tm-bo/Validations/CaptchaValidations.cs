using opencops_tm_bo.Helper;
using opencops_tm_bo.Models.Account;
using System.ComponentModel.DataAnnotations;

namespace opencops_tm_bo.Validations
{
    public class CaptchaValidations : ValidationAttribute
    {
        private CaptchaService _captchaService = new CaptchaService();
        private Messages _messages = new Messages();
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var captcha = (string)value;
                // Check captcha validity using your captcha verification logic
                bool isCaptchaValid = _captchaService.VerifyCaptcha(captcha);

                if (!isCaptchaValid)
                {
                    return new ValidationResult(_messages.CAPTCHA_VALIDATION_FAILED);
                }
                return ValidationResult.Success;
            }
            return new ValidationResult(_messages.CAPTCHA_VALIDATION_FAILED);
        }
    }
}
