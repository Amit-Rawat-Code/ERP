using BAL.PaymentGateway;
using DAL;
using DAL.DataTransferService;
using DAL.PaymentService;
using DAL.PaymentService.AXIS;
using DAL.PaymentService.HDFC;
using Repository;
using System;
using Unity;

namespace SEF
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public static class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container =
          new Lazy<IUnityContainer>(() =>
          {
              var container = new UnityContainer();
              RegisterTypes(container);
              return container;
          });

        /// <summary>
        /// Configured Unity Container.
        /// </summary>
        public static IUnityContainer Container => container.Value;
        #endregion

        /// <summary>
        /// Registers the type mappings with the Unity container.
        /// </summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>
        /// There is no need to register concrete types such as controllers or
        /// API controllers (unless you want to change the defaults), as Unity
        /// allows resolving a concrete type even if it was not previously
        /// registered.
        /// </remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            // NOTE: To load from web.config uncomment the line below.
            // Make sure to add a Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            // TODO: Register your type's mappings here.
            container.RegisterType<IDALTransport_Master, DALTransport_Master>();
            container.RegisterType<IDALTransport_Trans, DALTransport_Trans>();
            container.RegisterType<IDALTransport_Report, DALTransport_Report>();
            container.RegisterType<IDALTicket_Dash, DALTicket_Dash>();
            container.RegisterType<IDALTicket_Master, DALTicket_Master>();
            container.RegisterType<IDALTicket_Trans, DALTicket_Trans>();
            container.RegisterType<IDALInventory_Master, DALInventory_Master>();
            container.RegisterType<IDALInventory_Trans, DALInventory_Trans>();
            container.RegisterType<IDALInventory_Report, DALInventory_Report>();
            container.RegisterType<IDALExam_Master, DALExam_Master>();
            container.RegisterType<IDALSMS_Master, DALSMS_Master>();
            container.RegisterType<IDALSMS_Transaction, DALSMS_Transaction>();
            container.RegisterType<IDALMaster_Transfer, MasterTransfer>();
            container.RegisterType<ILedger_Transfer, LedgerTransfer>();
            container.RegisterType<IPaymentGatewayCredential, PaymentGatewayCredential>();
            container.RegisterType<IHDFCPaymentStatus, HDFCPaymentStatus>();
            //container.RegisterType<IAxisPaymentGateWay, AxisPaymentGateWay>();
            container.RegisterType<IAxisPaymentGatewayRquest, AxisPaymentGatewayRquest>();
            container.RegisterType<IAxisPaymentGatewayResponse, AxisPaymentGatewayResponse>();
            container.RegisterType<IHDFCPaymentGateWay, HDFCPaymentGateWay>();
            container.RegisterType<IHDFCPaymentGatewayRquest, HDFCPaymentGatewayRequest>();
            container.RegisterType<IHDFCPaymentGatewayResponse, HDFCPaymentGatewayResponse>();
            container.RegisterType<IOnlinePayment, OnlinePayment>();
            container.RegisterType<IAxisPaymentStatus, AXISPaymentStatus>();
        }
    }
}