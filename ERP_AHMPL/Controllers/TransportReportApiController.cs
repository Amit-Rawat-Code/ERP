using BAL;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Repository;

namespace SEF.Controllers
{
    public class TransportReportApiController : ApiController
    {
        private readonly IDALTransport_Report _DALTransport_Report;
        public TransportReportApiController(IDALTransport_Report DALTransport_Report)
        {
            this._DALTransport_Report = DALTransport_Report;
        }
        // GET: TransportReportApi
        [HttpPost]
        public async Task<DataTable> GetVehicleReport(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Report.GetVehicleReport(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<List<VehicleReportList>> MGetVehicleReport(BalTransportModule obj)
        {
            List<VehicleReportList> VehicleReportList = new List<VehicleReportList>();
            DataTable dt = await _DALTransport_Report.GetVehicleReport(obj).ConfigureAwait(false);
            if (dt.Rows.Count > 1)
            {
                VehicleReportList = new List<VehicleReportList>();
                VehicleReportList = (from DataRow dr in dt.Rows
                                     select new VehicleReportList()
                                     {
                                         VehicleNumber = dr["VehicleNumber"]?.ToString(),
                                         DriverName = dr["DriverName"]?.ToString(),
                                         StudentDetails = JsonConvert.DeserializeObject<List<StudentDetailsList>>(dr["StudentDetails"].ToString()),
                                         VehicleUID = dr["VehicleUID"]?.ToString(),
                                         VehicleCapacity = dr["VehicleCapacity"]?.ToString()
                                     }).ToList();
            }
            return VehicleReportList;
        }

        [HttpPost]
        public async Task<DataTable> GetVehicleReportCount(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Report.GetVehicleReportCount(obj).ConfigureAwait(false);
            return dt;
        }

    }
}