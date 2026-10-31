using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IWebHelper
    {
        string ProcessRequest(string address,
            string content = null,
            IDictionary<string, string> header = null,
            string method = "POST",
            string username = null,
            string password = null);

        Task<string> ProcessRequestAsync(string address,
            string content = null,
            IDictionary<string, string> header = null,
            string method = "POST",
            string username = null,
            string password = null);
    }
}
