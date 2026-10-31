using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
namespace SEF.Controllers
{
    public class TimeTableReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetClassWiseTimeTable(RearrangeTimeTablePeriod obj)
        {
            DataTable dt = await DLL.dal.GetClassWiseTimeTable(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetTeacherWiseTimeTable(RearrangeTimeTablePeriod obj)
        {
            DataTable dt = await DLL.dal.GetTeacherWiseTimeTable(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DayWiseTimeTable> GETClassTimeTableDayWise(RearrangeTimeTablePeriod obj)
        {
            _ = new DayWiseTimeTable();
            DayWiseTimeTable dwtt = await DLL.dal.GETClassTimeTableDayWise(obj);
            return dwtt;
        }
        [HttpPost]
        public async Task<DayWiseTimeTable> GETMobileClassTimeTableDayWise(RearrangeTimeTablePeriod obj)
        {
            _ = new DayWiseTimeTable();
            DayWiseTimeTable dwtt = await DLL.dal.GETMobileClassTimeTableDayWise(obj);
            return dwtt;
        }
        //[HttpPost]
        //public async Task<DataTable> TeacherSubstitutionSuggestions(RearrangeTimeTablePeriod obj)
        //{
        //    DataTable dt = await DLL.dal.TeacherSubstitutionSuggestions(obj);
        //    return dt;
        //}

        [HttpPost]
        public async Task<DataSet> TeacherWorkLoadReport(RearrangeTimeTablePeriod obj)
        {
            DataSet dt = await DLL.dal.GetTeacherWorkLoad(obj);
            return dt;
        }
    }
}