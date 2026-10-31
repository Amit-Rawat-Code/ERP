using BAL;
using DAL;
using System.Data;
using System.Web.Http;
using System.Threading.Tasks;

namespace SEF.Controllers
{
    public class TestApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetShiftClassMapping(BALShiftClassMapping obj)
        {
            DataTable dt = await DLL.dal.GetShiftClassMapping(obj);
            return dt;
        }
        
        [HttpPost]
        public async Task<DataSet> GetShiftPeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            DataSet ds = await DLL.dal.GetShiftPeriodMappingMaster(obj);
            return ds;
        }

        [HttpPost]
        public async Task<DataSet> GetTestTableManualList(RearrangeTestTablePeriod obj)
        {
            DataSet ds = await DLL.dal.GetTestTableManualList(obj);
            return ds;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteTestTable(RearrangeTestTablePeriod obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTestTable(obj);
            return result;
        }
    }
}
