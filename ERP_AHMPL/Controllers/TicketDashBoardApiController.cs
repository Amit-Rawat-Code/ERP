using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using System;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using Repository;

namespace SEF.Controllers
{
    public class TicketDashBoardApiController : ApiController
    {
        readonly IDALTicket_Dash _DALTicket_Dash;
        public TicketDashBoardApiController(IDALTicket_Dash DALTicket_Dash)
        {
            this._DALTicket_Dash = DALTicket_Dash;
        }
        
        [System.Web.Http.HttpPost]
        public async Task<DataTable> DashBoardLevel1(BALTicket obj)
        {
            DataTable dt = await _DALTicket_Dash.DashBoardLevel1(obj).ConfigureAwait(false);
            return dt;
        }
        
        [System.Web.Http.HttpPost]
        public async Task<DataTable> DashBoardLevel2(BALTicket obj)
        {
            DataTable dt = await _DALTicket_Dash.DashBoardLevel2(obj).ConfigureAwait(false);
            return dt;
        }
    }
}
