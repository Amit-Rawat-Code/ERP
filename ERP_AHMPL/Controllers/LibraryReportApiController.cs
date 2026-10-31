using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class LibraryReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetBookSearchList(BookSearch obj)
        {
            DataTable dt = await DLL.dal.GetBookSearchList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetIssueBookList(BookSearch obj)
        {
            DataTable dt = await DLL.dal.GetIssueBookList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GeIssueBookDetail(BookSearch obj)
        {
            DataTable dt = await DLL.dal.GetIssueBookDetail(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetBookIssueAndReturnReport(BookSearch obj)
        {
            DataTable dt = await DLL.dal.GetBookIssueAndReturnReport(obj);
            return dt;
        }
    }
}
