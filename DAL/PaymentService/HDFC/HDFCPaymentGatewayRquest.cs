using BAL.PaymentGateway.HDFC;
using Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.PaymentService.HDFC
{
    public class HDFCPaymentGatewayRequest : IHDFCPaymentGatewayRquest
    {
        public async Task<string> InsertHDFCPaymentGatewayRequestAsync(HDFCPaymentRequestDetail paymentRequestDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentFeeDetails",paymentRequestDetail.StudentFeeDetails),
                new SqlParameter("@StudentCode",paymentRequestDetail.StudentCode),
                new SqlParameter("@OrderId",paymentRequestDetail.OrderId),
                new SqlParameter("@PaymentGatewayId",paymentRequestDetail.PaymentGatewayId),
                new SqlParameter("@RelationshipId",paymentRequestDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentRequestDetail.SessionId),
                new SqlParameter("@FYId",paymentRequestDetail.FYId),
                new SqlParameter("@CreatedBy",paymentRequestDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentRequestDetail.UpdatedBy),
                new SqlParameter("@Action", paymentRequestDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_PaymentRequest", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> RegistrationFormInsertHDFCPaymentGatewayRequestAsync(HDFCPaymentRequestDetail paymentRequestDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentFeeDetails",paymentRequestDetail.StudentFeeDetails),
                new SqlParameter("@StudentCode",paymentRequestDetail.StudentCode),
                new SqlParameter("@OrderId",paymentRequestDetail.OrderId),
                new SqlParameter("@PaymentGatewayId",paymentRequestDetail.PaymentGatewayId),
                new SqlParameter("@RelationshipId",paymentRequestDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentRequestDetail.SessionId),
                new SqlParameter("@FYId",paymentRequestDetail.FYId),
                new SqlParameter("@CreatedBy",paymentRequestDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentRequestDetail.UpdatedBy),
                new SqlParameter("@Amount",paymentRequestDetail.Amount),
                new SqlParameter("@Action", paymentRequestDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_PaymentRequest_RegistrationSale]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
