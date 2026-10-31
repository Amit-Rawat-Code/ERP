using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALInventory_Report
    {
        #region Inventory Report
        Task<DataTable> GetInventoryReport(InventoryReport obj);
        #endregion
    }
}
