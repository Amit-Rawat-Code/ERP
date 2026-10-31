using BAL.PaymentGateway;
using BAL.PaymentGateway.ICICI;
using Newtonsoft.Json;
using Repository;
using System;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DAL.PaymentService.ICICI
{
    public class ICICIPaymentStatus : IICICIPaymentStatus
    { 
        public async Task<string> CreatePaymentStatusRequestAsync(ICICIPaymentVarification ICICIPaymentVarification, GatewayCredentials paymentGatewayCredentials)
        {
            var content = GetRequestBodyForPaymentStatusAsync(ICICIPaymentVarification, paymentGatewayCredentials);
            //NameValueCollection nameValueCollection = new NameValueCollection
            //{
            //    { "i", requestBody }
            //};
            var res = await GetWebServiceResponse(content, paymentGatewayCredentials.StatusRequestUrl);
            return res;
        }
        private string GetRequestBodyForPaymentStatusAsync(ICICIPaymentVarification paymentRequest, GatewayCredentials gatewayCredentials)
        {
            string postbackurl = "ezpaytranid=&amount=&paymentmode=&merchantid=" + gatewayCredentials.MerchantId + "&trandate=&pgreferenceno=" + paymentRequest.OrderId;
            return postbackurl;
        }
        public async Task<string> GetWebServiceResponse(string content, string statusRequestUrl)
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            string result;
            try
            {
                WebClient client = new WebClient();
                client.Headers.Add("Content-Type:application/json"); //Content-Type  
                client.Headers.Add("Accept:application/json");
                result = await client.DownloadStringTaskAsync(statusRequestUrl + "?" + content);
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
    }
}
