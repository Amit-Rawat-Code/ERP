using Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class WebHelper : IWebHelper
    {

        public string ProcessRequest(string address,
            string content = null,
            IDictionary<string, string> header = null,
            string method = "POST",
            string username = null,
            string password = null)
        {
            try
            {
                return InternalProcessRequestAsync(internalMethodName: "ProcessRequest", address: address, content: content, header: header, method: method, username: username, password: password).Result;
            }
            catch (AggregateException ae)
            {
                foreach (var e in ae.Flatten().InnerExceptions)
                {
                    throw e;
                }

                return string.Empty;
            }
        }
        public async Task<string> ProcessRequestAsync(string address,
            string content = null,
            IDictionary<string, string> header = null,
            string method = "POST",
            string username = null,
            string password = null)
        {
            try
            {
                return await InternalProcessRequestAsync(internalMethodName: "ProcessRequestAsync", address: address, content: content, header: header, method: method, username: username, password: password);
            }
            catch (AggregateException ae)
            {
                foreach (var e in ae.Flatten().InnerExceptions)
                {
                    throw e;
                }

                return string.Empty;
            }
        }

        private async Task<string> InternalProcessRequestAsync(string internalMethodName, string address, string content, IDictionary<string, string> header, string method,
            string username, string password)
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(address);
                request.Method = method;
                request.ContentType = "application/json";
                request.Accept = "application/json";
                if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
                {
                    request.Credentials = new NetworkCredential(username, password);
                }

                if (header != null)
                {
                    foreach (var key in header.Keys)
                    {
                        request.Headers.Add(key, header[key]);
                    }
                }

                if (content != null)
                {
                    using (var streamWriter = new StreamWriter(request.GetRequestStream()))
                    {
                        var jsonElement = content;
                        await streamWriter.WriteAsync(jsonElement);
                        await streamWriter.FlushAsync();
                    }
                }

                var response = await request.GetResponseAsync().ConfigureAwait(false);
                var responseStream = response.GetResponseStream();
                if (responseStream == null) return null;
                using (var streamReader = new StreamReader(responseStream))
                {
                    var result = await streamReader.ReadToEndAsync();
                    return result;
                }
            }
            catch (WebException wex)
            {
                var errorResponse = wex.Response as HttpWebResponse;
                if (errorResponse != null && (errorResponse.StatusCode == HttpStatusCode.Unauthorized ||
                                              errorResponse.StatusCode == HttpStatusCode.NotFound ||
                                              errorResponse.StatusCode == HttpStatusCode.InternalServerError))
                {
                    //rethrow 401, 404 and 500, no error expected and specific enough.
                    throw;
                }
                else
                {
                    if (errorResponse == null) throw;

                    using (var stream = errorResponse.GetResponseStream())
                    using (var reader = new StreamReader(stream))
                    {
                        var error = await reader.ReadToEndAsync();
                        throw new Exception(error);
                    }
                }
            }
        }

        public bool IsValidImageUrl(string url)
        {
            bool isValidUrl = false;
            if (!string.IsNullOrEmpty(url))
            {
                HttpWebResponse response = null;
                var request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "HEAD";
                try
                {
                    response = (HttpWebResponse)request.GetResponse();
                    response.Close();
                    if (response.StatusCode == HttpStatusCode.OK && response.ContentType.Contains("image/"))
                        isValidUrl = true;
                }
                catch (Exception ex)
                {
                    isValidUrl = false;
                }
            }
            return isValidUrl;
        }
    }
}
