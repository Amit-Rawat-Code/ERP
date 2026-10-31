using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALTicket_Trans: IDALTicket_Trans
    {
        #region Ticket Generate        
        public async Task<string> InsertUpdateDeleteTicketGenerate(BALTicket obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@TicketTypeID",obj.TicketTypeID),
                new SqlParameter("@ModuleID",obj.ModuleID),
                new SqlParameter("@MenuID",obj.MenuID),
                new SqlParameter("@SubMenuID",obj.SubMenuID),
                new SqlParameter("@TicketDescription",obj.TicketDescription),
                new SqlParameter("@FilePath",obj.FileJson),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_TicketGenerate]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<DataTable> GetTicketGenerate(BALTicket obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_TicketGenerate]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Ticket Response
        public async Task<string> InsertUpdateDeleteTicketResponse(BALTicket obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),

                new SqlParameter("@TransID_RaisedTicket",obj.TransID_RaisedTicket),
                new SqlParameter("@TicketNo_RaisedTicket",obj.TicketNo_RaisedTicket),
                new SqlParameter("@TicketDate_RaisedTicket",obj.TicketDate_RaisedTicket),
                new SqlParameter("@TicketTypeID_RaisedTicket",obj.TicketTypeID_RaisedTicket),
                new SqlParameter("@RelationshipId_RaisedTicket",obj.RelationshipId_RaisedTicket),
                new SqlParameter("@CreatedBy_RaisedTicket",obj.CreatedBy_RaisedTicket),

                new SqlParameter("@TicketStatusID",obj.TicketStatusID),
                new SqlParameter("@ResponseDescription",obj.ResponseDescription),
                new SqlParameter("@FilePath",obj.FileJson),
                
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_TicketResponse]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<DataTable> GetTicketResponse(BALTicket obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@TransID_RaisedTicket",obj.TransID_RaisedTicket),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_TicketResponse]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        public async Task<string> UpdateFinalTicketStatus(BALTicket obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),

                new SqlParameter("@TransID_RaisedTicket",obj.TransID_RaisedTicket),
                new SqlParameter("@TicketNo_RaisedTicket",obj.TicketNo_RaisedTicket),
                new SqlParameter("@TicketDate_RaisedTicket",obj.TicketDate_RaisedTicket),
                new SqlParameter("@TicketTypeID_RaisedTicket",obj.TicketTypeID_RaisedTicket),
                new SqlParameter("@RelationshipId_RaisedTicket",obj.RelationshipId_RaisedTicket),
                new SqlParameter("@CreatedBy_RaisedTicket",obj.CreatedBy_RaisedTicket),

                new SqlParameter("@TicketStatusID",obj.TicketStatusID),
                new SqlParameter("@ResponseDescription",obj.ResponseDescription),                

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_TicketResponse]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        
    }
}

