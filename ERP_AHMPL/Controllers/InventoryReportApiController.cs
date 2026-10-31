using BAL;
using Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;


namespace SEF.Controllers
{
    public class InventoryReportApiController : ApiController
    {
        // GET: InventoryReportApi
        readonly IDALInventory_Report _IDALInventory_Report;

        public InventoryReportApiController(IDALInventory_Report DALInventory_Report)
        {
            this._IDALInventory_Report = DALInventory_Report;
        }

        [HttpPost]
        public async Task<DataTable> GetInventoryReport(InventoryReport obj)
        {
            DataTable dt = await _IDALInventory_Report.GetInventoryReport(obj).ConfigureAwait(false);
            return dt;
        }
    }
}