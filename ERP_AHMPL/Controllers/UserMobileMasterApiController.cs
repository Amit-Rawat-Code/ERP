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
    public class UserMobileMasterApiController : ApiController
    {
        public static List<string> InvalidJsonElements;
        // GET: UserMobileMasterApi

        [HttpPost]
        public async Task<DataSet> GetMobileNavigationMenuForRole(BALMobileNavigationMenu ob)
        {
            DataSet ds = await DLL.dal.GetMobileNavigationMenuForRole(ob);
            return ds;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteMobileNavigationMenuForRole(BALMobileNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteMobileNavigationMenuForRole(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetUserMobileRolePermission(BALMobileNavigationMenu obj)
        {
            DataTable result = await DLL.dal.GetUserMobileRolePermission(obj);
            return result;

        }
        [HttpPost]
        public async Task<List<MobileNavigationMenu>> MGetUserMobileRolePermission(BALMobileNavigationMenu obj)
        {
            List<MobileNavigationMenu> MobileNavigationMenu = new List<MobileNavigationMenu>();
            DataTable dt = await DLL.dal.GetUserMobileRolePermission(obj);
            if (dt.Rows.Count > 1)
            {
                MobileNavigationMenu = new List<MobileNavigationMenu>();
                MobileNavigationMenu = (from DataRow dr in dt.Rows
                                        select new MobileNavigationMenu()
                                        {
                                            Menu = dr["Menu"]?.ToString(),
                                            SubMenu = JsonConvert.DeserializeObject<List<SubMenuesList>>(dr["SubMenu"].ToString()),
                                            DisplayOrder = Convert.ToInt32(dr["DisplayOrder"]?.ToString()),
                                            IsActive = Convert.ToBoolean(dr["IsActive"]?.ToString())
                                        }).ToList();
            }
            return MobileNavigationMenu;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUserMobilePermission(BALMobileNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUserMobilePermission(obj);
            return result;
        }
        public async Task<string> InsertUpdateDeleteMobileRoleAssignments(BALNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteMobileRoleAssignments(obj);
            return result;

        }
        [HttpPost]
        public async Task<DataTable> GetMobileUserRole(BALNavigationMenu obj)
        {
            DataTable dt = await DLL.dal.GetMobileUserRole(obj);
            return dt;

        }

    }
    }