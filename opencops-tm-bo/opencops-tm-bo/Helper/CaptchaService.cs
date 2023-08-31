using Newtonsoft.Json.Linq;
using opencops_tm_bo.Controllers;
using opencops_tm_bo.Entities;

namespace opencops_tm_bo.Helper
{
    public class CaptchaService
    {

        private readonly Messages _messages = new Messages();
        public bool VerifyCaptcha(string Captcha)
        {
            var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var GoogleCaptchaSecret = config["Captcha:gCaptchaSecret"];
            var GoogleUrl = config["Captcha:captchaURL"];
            using var httpClient = new HttpClient();
            {
                try
                {
                    var httpResponse = httpClient.GetAsync(GoogleUrl + GoogleCaptchaSecret + "&response=" + Captcha).Result;
                    if (httpResponse.IsSuccessStatusCode)
                    {
                        string jsonResponse = httpResponse.Content.ReadAsStringAsync().Result;
                        dynamic jsonData = JObject.Parse(jsonResponse);
                        if (jsonData.success == true.ToString().ToLower())
                        {
                            return true;
                        }
                    }
                }
                catch
                {
                    return false;
                }

                return false;
            }
        }
    }
}
