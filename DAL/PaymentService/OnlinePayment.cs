using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace BAL.PaymentGateway
{
    public class OnlinePayment : IOnlinePayment
    {
        public async Task<DataTable> GetPaymentHistory(PaymentDetails paymentDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentCode",paymentDetail.StudentCode),
                new SqlParameter("@RelationshipId",paymentDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentDetail.SessionId),
                new SqlParameter("@Action", paymentDetail.Action)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_PaymentHistory]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetPaymentReport(PaymentDetails paymentDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@FromDate",paymentDetail.FromDate),
                new SqlParameter("@ToDate",paymentDetail.ToDate),
                new SqlParameter("@StudentCode",paymentDetail.StudentCode),
                new SqlParameter("@RelationshipId",paymentDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentDetail.SessionId),
                new SqlParameter("@Action", paymentDetail.Action)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_OnlinePaymentReport", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetNotSuccessOnlinePayments(PaymentDetails paymentDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@FromDate",paymentDetail.FromDate),
                new SqlParameter("@ToDate",paymentDetail.ToDate),
                new SqlParameter("@StudentCode",paymentDetail.StudentCode),
                new SqlParameter("@OrderId",paymentDetail.OrderId),
                new SqlParameter("@RelationshipId",paymentDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentDetail.SessionId),
                new SqlParameter("@Action", paymentDetail.Action)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_NotSuccessOnlinePayments", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
