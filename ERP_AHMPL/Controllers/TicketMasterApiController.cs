using BAL;
using DAL;
using Repository;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TicketMasterApiController : ApiController
    {
        readonly IDALTicket_Master _IDALTicket_Master;

        public TicketMasterApiController(IDALTicket_Master IDALTicket_Master)
        {
            this._IDALTicket_Master = IDALTicket_Master;
        }

        #region TicketType Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTicketTypeMaster(BALTicket obj)
        {
            string result = await _IDALTicket_Master.InsertUpdateDeleteTicketTypeMaster(obj).ConfigureAwait(false);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTicketTypeMaster(BALTicket obj)
        {
            DataTable dt = await _IDALTicket_Master.GetTicketTypeMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region TicketStatus Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTicketStatusMaster(BALTicket obj)
        {
            string result = await _IDALTicket_Master.InsertUpdateDeleteTicketStatusMaster(obj).ConfigureAwait(false);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTicketStatusMaster(BALTicket obj)
        {
            DataTable dt = await _IDALTicket_Master.GetTicketStatusMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
    }
}
