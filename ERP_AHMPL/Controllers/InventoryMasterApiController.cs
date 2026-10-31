using DAL;
using BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Data;
using Repository;

namespace SEF.Controllers
{
    public class InventoryMasterApiController : ApiController
    {
        readonly IDALInventory_Master _DALInventory_Master;
        
        public InventoryMasterApiController(IDALInventory_Master DALInventory_Master)
        {
            this._DALInventory_Master = DALInventory_Master;
        }
        // GET: InventoryMasterApi
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUnitMaster(Unit obj)
        {
            string result = await _DALInventory_Master.InsertUpdateDeleteUnitMaster(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetUnitMaster(Unit obj)
        {
            DataTable dt = await _DALInventory_Master.GetUnitMaster(obj).ConfigureAwait(false); 
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteItemGroupMaster(Unit obj)
        {
            string result = await _DALInventory_Master.InsertUpdateDeleteItemGroupMaster(obj).ConfigureAwait(false); 
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetItemGroupMaster(Unit obj)
        {
            DataTable dt = await _DALInventory_Master.GetItemGroupMaster(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteItemCategoryMaster(ItemGroup obj)
        {
            string result = await _DALInventory_Master.InsertUpdateDeleteItemCategoryMaster(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetItemCategoryMaster(ItemGroup obj)
        {
            DataTable dt = await _DALInventory_Master.GetItemCategoryMaster(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCommodityMaster(HSNCode obj)
        {
            string result = await _DALInventory_Master.InsertUpdateDeleteCommodityMaster(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetCommodityMaster(HSNCode obj)
        {
            DataTable dt = await _DALInventory_Master.GetCommodityMaster(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteItemMaster(Inventory obj)
        {
            string result = await _DALInventory_Master.InsertUpdateDeleteItemMaster(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetItemMaster(Inventory obj)
        {
            DataTable dt = await _DALInventory_Master.GetItemMaster(obj).ConfigureAwait(false);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteModelMaster(Model obj)
        {
            string result = await _DALInventory_Master.InsertUpdateDeleteModelMaster(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetModelMaster(Model obj)
        {
            DataTable dt = await _DALInventory_Master.GetModelMaster(obj).ConfigureAwait(false);
            return dt;
        }

        //public async Task<string> InsertUpdateDeleteExpenseTaxesHeadMaster(BMaterial obj)
        //{
        //    string result = await _DALInventory_Master.InsertUpdateDeleteExpenseTaxesHeadMaster(obj).ConfigureAwait(false);
        //    return result;
        //}
        //public async Task<DataTable> GetExpenseTaxesHeadMaster(BMaterial obj)
        //{
        //    DataTable dt = await _DALInventory_Master.GetExpenseTaxesHeadMaster(obj).ConfigureAwait(false);
        //    return dt;
        //}
    }
}