using BAL;
using Repository;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class TransportTransactionApiController : ApiController
    {
        readonly IDALTransport_Trans _DALTransport_Trans;
        readonly IDALTransport_Master _DALTransport_Master;
        public TransportTransactionApiController(IDALTransport_Trans DALTransport_Trans, IDALTransport_Master DALTransport_Master)
        {
            this._DALTransport_Trans = DALTransport_Trans;
            this._DALTransport_Master = DALTransport_Master;
        }

        #region Vehicle Route Mapping
        public async Task<string> InsertUpdateDeleteVehicleRouteMapping(BalTransportModule obj)
        {
            string dt = await _DALTransport_Trans.InsertUpdateDeleteVehicleRouteMapping(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetVehicleRouteMapping(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Trans.GetVehicleRouteMapping(obj).ConfigureAwait(false);

            return dt;
        }

        #endregion
        #region Vehicle Student Rute Mapping


        [HttpPost]
        public async Task<DataTable> GetClassWiseSectionWiseStudentName(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Master.GetClassWiseSectionWiseStudentName(obj).ConfigureAwait(false);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteStudentRouteVehicleMapping(BalTransportModule obj)
        {
            string dt = await _DALTransport_Trans.InsertUpdateDeleteStudentRouteVehicleMapping(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetStudentRouteVehicleMapping(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Trans.GetStudentRouteVehicleMapping(obj).ConfigureAwait(false);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetStudentsForTransport(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Trans.GetStudentsForTransport(obj).ConfigureAwait(false);

            return dt;
        }
        #endregion  
    }
}