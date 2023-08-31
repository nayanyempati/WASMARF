using opencops_tm_bo.Helper;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace opencops_tm_bo.Validations
{
    public class PasswordValidation : ValidationAttribute
    {
        private Messages _messages = new Messages();
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var password = (string)value;

                string pattern = @"^(?=.*[\W_])(?=.*[0-9]).{8,}$";
                bool checkPasswordValid = Regex.IsMatch(password, pattern);

                if (!checkPasswordValid)
                {
                    return new ValidationResult(_messages.INVALID_CREDENTIALS);
                }
                return ValidationResult.Success;
            }
            return new ValidationResult(_messages.INVALID_CREDENTIALS);
        }
    }
}
