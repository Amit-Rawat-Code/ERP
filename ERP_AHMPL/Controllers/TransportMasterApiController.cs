using BAL;
using Repository;
using System;
using System.Data;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class TransportMasterApiController : ApiController
    {
        readonly IDALTransport_Master _DALTransport_Master;
        public TransportMasterApiController(IDALTransport_Master DALTransport_Master)
        {
            this._DALTransport_Master = DALTransport_Master;
        }
        # region Vehicle Type Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteVehicleTypeMaster(BalVehicleTypeMaster obj)
        {
            string dt = await _DALTransport_Master.InsertUpdateDeleteVehicleTypeMaster(obj).ConfigureAwait(false);

            return dt;
        }
        #endregion

        [HttpPost]
        public async Task<DataTable> GetVehicleTypeMaster(BalVehicleTypeMaster obj)
        {
            DataTable dt = await _DALTransport_Master.GetVehicleTypeMaster(obj).ConfigureAwait(false);

            return dt;
        }

        #region Vehicle Owner Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteVehicleOwnerMaster(BalVehicleOwnerMaster obj)
        {
            string dt = await _DALTransport_Master.InsertUpdateDeleteVehicleOwnerMaster(obj).ConfigureAwait(false);

            return dt;
        }

        #endregion
        [HttpPost]
        public async Task<DataTable> GetVehicleOwnerMaster(BalVehicleOwnerMaster obj)
        {
            DataTable dt = await _DALTransport_Master.GetVehicleOwnerMaster(obj).ConfigureAwait(false);

            return dt;
        }

        #region Vehicle Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteVehicleMaster(BalVehicleMaster obj)
        {
            string dt = await _DALTransport_Master.InsertUpdateDeleteVehicleMaster(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetVehicleMaster(BalVehicleMaster obj)
        {
            DataTable dt = await _DALTransport_Master.GetVehicleMaster(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]

        #endregion

        #region Stoppage Master
        public async Task<string> InsertUpdateDeleteVehicleStoppageMaster(BalVehicleStoppageMaster obj)
        {
            string dt = await _DALTransport_Master.InsertUpdateDeleteVehicleStoppageMaster(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetVehicleStoppageMaster(BalVehicleStoppageMaster obj)
        {
            DataTable dt = await _DALTransport_Master.GetVehicleStoppageMaster(obj).ConfigureAwait(false);

            return dt;
        }

        #endregion
        #region Route Master
        public async Task<string> InsertUpdateDeleteVehicleRouteMaster(BalVehicleRouteMaster obj)
        {
            string dt = await _DALTransport_Master.InsertUpdateDeleteVehicleRouteMaster(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetVehicleRouteMaster(BalVehicleRouteMaster obj)
        {
            DataTable dt = await _DALTransport_Master.GetVehicleRouteMaster(obj).ConfigureAwait(false);

            return dt;
        }

        #endregion

        #region Fare Master
        public async Task<string> InsertUpdateDeleteVehicleFareMaster(BalTransportModule obj)
        {
            string dt = await _DALTransport_Master.InsertUpdateDeleteVehicleFareMaster(obj).ConfigureAwait(false);

            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetVehicleFareMaster(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Master.GetVehicleFareMaster(obj).ConfigureAwait(false);

            return dt;
        }

        #endregion

        #region Driver Detail Master
        [HttpPost]

        public async Task<string> InsertUpdateDeleteDriverDetailMaster(BalTransportModule obj)
        {
            byte[] bytes = null;
            string extention = "";
            string seprator = "";

            if (obj.PhotoIdList != null)
            {
                StringBuilder uplo = new StringBuilder();

                for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
                {
                    obj.AlbumIcon = obj.PhotoIdList[a];
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
                    var imageStream = new MemoryStream(bytes, false);
                    string NewFileName = "";

                    string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
                    NewFileName += strUnique;
                    NewFileName += DateTime.Now.Year.ToString();
                    NewFileName += DateTime.Now.Month.ToString();
                    NewFileName += DateTime.Now.Day.ToString();
                    NewFileName += DateTime.Now.Hour.ToString();
                    NewFileName += DateTime.Now.Minute.ToString();
                    NewFileName += DateTime.Now.Second.ToString();
                    NewFileName += DateTime.Now.Millisecond.ToString();
                    string uploadpath = "~/Uploads/Site/Transport/DriverImage/";
                    string uploadpaths = "/Uploads/Site/Transport/DriverImage/" + NewFileName + extention;
                    string filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
                    bool exists = System.IO.Directory.Exists(filePath);
                    if (!exists)
                    {
                        System.IO.Directory.CreateDirectory(filePath);
                    }
                    FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
                    imageStream.WriteTo(file);
                    file.Close();
                    imageStream.Close();
                    uplo.Append(seprator);
                    uplo.Append(uploadpaths);
                    seprator = ",";
                    obj.PhotoId = uplo.ToString().Trim();

                }
                string result = await _DALTransport_Master.InsertUpdateDeleteDriverDetailMaster(obj).ConfigureAwait(false);
                return result;
            }

            else
            {
                string result = await _DALTransport_Master.InsertUpdateDeleteDriverDetailMaster(obj);
                return result;
            }
        }
        
        [HttpPost]
        public async Task<DataTable> GetDriverDetailMaster(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Master.GetDriverDetailMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        [HttpPost]
        public async Task<DataTable> GetClassWiseSectionWiseStudentName(BalTransportModule obj)
        {
            DataTable dt = await _DALTransport_Master.GetClassWiseSectionWiseStudentName(obj).ConfigureAwait(false);
            return dt;
        }
    }
}