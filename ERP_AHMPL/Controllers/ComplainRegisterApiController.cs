using BAL;
using DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class ComplainRegisterApiController : ApiController
    {   [HttpPost]
        public async Task<DataTable> SearchStudent(Complain obj)
        {
            DataTable result = await DLL.dal.SearchStudent(obj);
            return result;
        }
        [HttpPost]
        public async Task<string> InsertDeleteComplainRegister(Complain obj)
        {
            string result = await DLL.dal.InsertDeleteComplainRegister(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> ComplainRegisterList(Complain obj)
        {
            DataTable result = await DLL.dal.ComplainRegisters(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTeacherList(Complain obj)
        {
            DataTable result = await DLL.dal.GetTeacherList(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetAllList(Complain obj)
        {
            DataTable result = await DLL.dal.GetAllList(obj);
            return result;
        }
    }
}