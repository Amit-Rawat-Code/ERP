using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALInventory_Master
    {

        #region Unit Master
        Task<string> InsertUpdateDeleteUnitMaster(Unit obj);
        Task<DataTable> GetUnitMaster(Unit obj);

        #endregion

        #region Item Group Master
        Task<string> InsertUpdateDeleteItemGroupMaster(Unit obj);
        Task<DataTable> GetItemGroupMaster(Unit obj);
        #endregion

        #region Item Category Master
        Task<string> InsertUpdateDeleteItemCategoryMaster(ItemGroup obj);
        Task<DataTable> GetItemCategoryMaster(ItemGroup obj);
        #endregion

        #region Item Master
        Task<string> InsertUpdateDeleteItemMaster(Inventory obj);
        Task<DataTable> GetItemMaster(Inventory obj);
        #endregion

        #region Commodity Master
        Task<string> InsertUpdateDeleteCommodityMaster(HSNCode obj);
        Task<DataTable> GetCommodityMaster(HSNCode obj);

        #endregion

        #region Model Master
        Task<string> InsertUpdateDeleteModelMaster(Model obj);
        Task<DataTable> GetModelMaster(Model obj);
        #endregion

    }
}
