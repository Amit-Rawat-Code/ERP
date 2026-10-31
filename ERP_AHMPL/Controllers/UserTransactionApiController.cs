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
    public class UserTransactionApiController : ApiController
    {
        #region User Master
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteNavigationMenuForRole(BALNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteNavigationMenuForRole(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataSet> GetNavigationMenuForRole(BALNavigationMenu obj)
        {
            DataSet result = await DLL.dal.GetNavigationMenuForRole(obj);
            return result;
        }
        #endregion


        #region User Roles Assignments
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUserRoleAssignments(BALNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUserRoleAssignments(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataSet> GetUserRoleAssignments(BALNavigationMenu obj)
        {
            DataSet result = await DLL.dal.GetUserRoleAssignments(obj);
            return result;
        }
        #endregion

        #region User permission
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUserPermission(BALNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUserPermission(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataSet> GetUserPermission(BALNavigationMenu obj)
        {
            DataSet result = await DLL.dal.GetUserPermission(obj);
            return result;
            }
        #endregion 



        #region User permission
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUserPermissionSchoolWise(BALNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUserPermissionSchoolWise(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetUserPermissionSchoolWise(BALNavigationMenu obj)
        {
            DataTable result = await DLL.dal.GetUserPermissionSchoolWise(obj);
            return result;
        }
        #endregion


        #region Back Date Entry permission
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBackEntryDatePermission(BALNavigationMenu obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBackDateEntryPermission(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetBackEntryDatePermission(BALNavigationMenu obj)
        {
            DataTable result = await DLL.dal.GetBackDateEntryPermission(obj);
            return result;
        }
        #endregion
        // Update Student Role Assignment Page (Admission Tranaction)
        [HttpPost]
        public async Task<string> UpdateUserRoleAssignmentForStudentRole(BALNavigationMenu obj)
        {
            string result = await DLL.dal.UpdateUserRoleAssignmentForStudentRole(obj);
            return result;
        }
    }
}
