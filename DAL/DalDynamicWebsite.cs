using BAL;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region Layout Master
        public async Task<string> InsertUpdateDeleteLayoutMaster(BALDynamicWebsite obj)
        {
            try
            {
                var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@LayoutName",obj.LayoutName),
                new SqlParameter("@LayoutPageName", obj.LayoutPageName),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@LayoutDemoImagePath",obj.LayoutDemoImage),
                new SqlParameter("@Result","")
            };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteLayoutMaster]", CommandType.StoredProcedure, param.ToArray()));
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        public async Task<DataTable> GetLayoutMaster(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@LayoutName",obj.LayoutName),
                new SqlParameter("@LayoutPageName",obj.LayoutPageName),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@MenuId",obj.MenuId),
                new SqlParameter("@SubMenuId",obj.SubMenuId),
                new SqlParameter("@TabId",obj.TabId),
                new SqlParameter("@UserId",obj.UserId),
               new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteLayoutMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion

        #region Layout Part Master
        public async Task<string> InsertUpdateDeleteLayoutPart(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@LayoutCode",obj.LayoutCode),
                new SqlParameter("@LayoutPart",obj.LayoutPart),
                new SqlParameter("@link",obj.Link),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@ContentImageDataDefaultSize",obj.ContentImageDataDefaultSize),
                new SqlParameter("@HeadingImageDataDefaultSize",obj.HeadingImageDataDefaultSize),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteLayoutPart]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLayoutPart(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@LayoutCode",obj.LayoutCode),
                new SqlParameter("@LayoutPart", obj.LayoutPart),
                new SqlParameter("@link", obj.Link),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteLayoutPart]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Unit Type Master
        public async Task<string> InsertUpdateDeleteUnitTypeMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@LayoutCode",obj.LayoutCode),
                new SqlParameter("@UnitType",obj.UnitType),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteUnitTypeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetUnitTypeMaster(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@LayoutCode",obj.LayoutCode),
                new SqlParameter("@UnitType",obj.UnitType),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteUnitTypeMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Unit Master
        public async Task<string> InsertUpdateDeleteUnitMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitTypeCode", obj.UnitTypeCode),
                new SqlParameter("@UnitName",obj.UnitName),
                new SqlParameter("@UnitTitle",obj.UnitTitle),
                new SqlParameter("@Logopath", obj.logopath),
                new SqlParameter("@FacebookLink",obj.FacebookLink),
                new SqlParameter("@TwitterLink",obj.TwitterLink),
                new SqlParameter("@YoutubeLink",obj.YoutubeLink),
                new SqlParameter("@VideoLink",obj.LayoutDemoImage),
                new SqlParameter("@YoutubeFeed",obj.YoutubeFeed),
                new SqlParameter("@FacebookFeed",obj.FacebookFeed),
                new SqlParameter("@SiteLocation",obj.SiteLocation),
                new SqlParameter("@MaintainedBy",obj.MaintainedBy),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@Url",obj.URL),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteUnitMaster]", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetUnitMaster(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitTypeCode", obj.UnitTypeCode),
                new SqlParameter("@UnitName",obj.UnitName),
                new SqlParameter("@UnitTitle",obj.UnitTitle),
                new SqlParameter("@Logopath", obj.logopath),
                new SqlParameter("@FacebookLink",obj.FacebookLink),
                new SqlParameter("@TwitterLink",obj.TwitterLink),
                new SqlParameter("@YoutubeLink",obj.YoutubeLink),
                new SqlParameter("@VideoLink",obj.HomeVideoLink),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@Url",obj.URL),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteUnitMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Tab Master
        public async Task<string> InsertUpdateDeleteTabMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                new SqlParameter("@TabName",obj.TabName),
                new SqlParameter("@URLType", obj.URLType),
                new SqlParameter("@TargetLayoutCode", obj.LayoutCode),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@Attachment",obj.Attachment),
                new SqlParameter("@TabAlignment",obj.TabAlignment),
                new SqlParameter("@TabImagePath",obj.TabImage),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteTabMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTabMaster(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                new SqlParameter("@TabName",obj.TabName),
                new SqlParameter("@URLType", obj.URLType),
                new SqlParameter("@TargetLayoutCode", obj.LayoutCode),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@Attachment",obj.Attachment),
                 new SqlParameter("@TabAlignment",obj.TabAlignment),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteTabMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion

        #region Menu Master
        public async Task<string> InsertUpdateDeleteMenuMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuName",obj.MenuName),
                new SqlParameter("@URLType", obj.URLType),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@Attachment",obj.MediaId),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteWebMenuMaster]", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetMenuMaster(BALDynamicWebsite obj)
        {
            try
            {
                DataTable dt;
                var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuName",obj.MenuName),
                new SqlParameter("@URLType", obj.URLType),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@Attachment",obj.Attachment),
                new SqlParameter("@Result","")
            };

                dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteWebMenuMaster]", CommandType.StoredProcedure, param.ToArray()));
                return dt;
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }

        #endregion

        #region Sub Menu Master
        public async Task<string> InsertUpdateDeleteWebSubMenuMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitTypeCode", obj.UnitTypeCode),
                new SqlParameter("@UnitCode", obj.UnitId),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuCode",obj.MenuId),
                new SqlParameter("@SubMenuName",obj.SubMenuName),
                new SqlParameter("@URLType", obj.URLType),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@Attachment",obj.Attachment),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteWebSubMenuMaster]", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetWebSubMenuMaster(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitTypeCode", obj.UnitTypeCode),
                new SqlParameter("@UnitCode", obj.UnitId),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuCode",obj.MenuId),
                new SqlParameter("@SubMenuName",obj.SubMenuName),
                new SqlParameter("@URLType", obj.URLType),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@SeqNo", obj.SeqNo),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@Attachment",obj.Attachment),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteWebSubMenuMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Footer Header
        public async Task<string> InsertUpdateDeleteFooterHeader(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@FooterHeaderText",obj.FooterHeaderText),
                    new SqlParameter("@SeqNo",obj.SeqNo),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteFooterHeaderMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFooterHeader(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@FooterHeaderText",obj.FooterHeaderText),
                    new SqlParameter("@SeqNo",obj.SeqNo),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteFooterHeaderMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Body Content Master
        public async Task<string> InsertUpdateDeleteBodyContent(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                   new SqlParameter("@Code",obj.Code),
                  new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                  new SqlParameter("@UnitCode",obj.UnitId),
                 new SqlParameter("@LayoutCode", obj.LayoutCode),
                 new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                 new SqlParameter("@TabCode",obj.TabId),
                 new SqlParameter("@MenuCode",obj.MenuId),
                 new SqlParameter("@SubMenuCode",obj.SubMenuId),
                 new SqlParameter("@BodyContent",obj.BodyContent),
                 new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@ImgPath",obj.ImgPath),
                  new SqlParameter("@ImgAlign",obj.ImgAlign),
                   new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                    new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                    new SqlParameter("@LayoutPartAbbreviationName",obj.LayoutPartAbbreviationName),
                    new SqlParameter("@HeadingImageHeight",obj.HeadingImageHeight),
                    new SqlParameter("@ImageHeight",obj.ImageHeight),
                     new SqlParameter("@ImageWidth",obj.ImageWidth),
                      new SqlParameter("@ImageObjectFit",obj.ImageObjectFit),
                      new SqlParameter("@ImageBorder",obj.ImageBorder),
                      new SqlParameter("@ImageBorderRadius",obj.ImageBorderRadius),
                      new SqlParameter("@OrderBy",obj.OrderBy),
                new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteBodyContent]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBodyContent(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
                {
                   new SqlParameter("@Action", obj.Action),
                   new SqlParameter("@Code",obj.Code),
                  new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                  new SqlParameter("@UnitCode",obj.UnitId),
                 new SqlParameter("@LayoutCode", obj.LayoutCode),
                 new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                 new SqlParameter("@TabCode",obj.TabId),
                 new SqlParameter("@MenuCode",obj.MenuId),
                 new SqlParameter("@SubMenuCode",obj.SubMenuId),
                 new SqlParameter("@BodyContent",obj.BodyContent),
                 new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                  new SqlParameter("@ImgPath",obj.ImgPath),
                  new SqlParameter("@ImgAlign",obj.ImgAlign),
                         new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                    new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                      new SqlParameter("@LayoutPartAbbreviationName",obj.LayoutPartAbbreviationName),
                      new SqlParameter("@HeadingImageHeight",obj.HeadingImageHeight),
                      new SqlParameter("@ImageHeight",obj.ImageHeight),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteBodyContent]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataSet> GetBodyCenterContentWithSlider(BALDynamicWebsite obj)
        {
            DataSet ds;
            var param = new List<SqlParameter>
                {
                   new SqlParameter("@Action", obj.Action),
                   new SqlParameter("@Code",obj.Code),
                  new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                  new SqlParameter("@UnitCode",obj.UnitId),
                 new SqlParameter("@LayoutCode", obj.LayoutCode),
                 new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                 new SqlParameter("@TabCode",obj.TabId),
                 new SqlParameter("@MenuCode",obj.MenuId),
                 new SqlParameter("@SubMenuCode",obj.SubMenuId),
                 new SqlParameter("@BodyContent",obj.BodyContent),
                 new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                  new SqlParameter("@ImgPath",obj.ImgPath),
                  new SqlParameter("@ImgAlign",obj.ImgAlign),
                         new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                    new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                new SqlParameter("@Result","")
            };

            ds = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[web].[USP_InsertUpdateDeleteBodyContent]", CommandType.StoredProcedure, param.ToArray()));
            return ds;
        }
        #endregion
        #region Create Photo Album
        public async Task<string> InsertPhotoAlbum(BALDynamicWebsite obj)
        {
            SqlParameter[] Para = new SqlParameter[]
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitId",obj.UnitId),
                new SqlParameter("@Title",obj.AlbumName),
                new SqlParameter("@AlbumIcon",obj.AlbumIcon),
                new SqlParameter("@EventDate",obj.EventDate),
                new SqlParameter("@Description",obj.Description),
                //new SqlParameter("@Mediafile",obj.MediafileUrl),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@PhotoGalleryType",obj.PhotoGalleryType),
                new SqlParameter("@ShownOn",obj.ShownOn),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@Result", 0),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[web].[USP_PhotoAlbum]", CommandType.StoredProcedure, Para.ToArray()));
        }
        public async Task<DataTable> GetPhotoAlbumList(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId", obj.RelationshipId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@PhotoGalleryType",obj.PhotoGalleryType)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_PhotoAlbum]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Upload Image In Album
        public async Task<string> InsertPhotoUploading(BALDynamicWebsite obj)
        {

            SqlParameter[] Para = new SqlParameter[]
       {
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@Code", obj.TransId),
                new SqlParameter("@PhotoIdList", obj.PhotoId),
                new SqlParameter("@Headline", obj.Headline),
                new SqlParameter("@UpdatedBy", obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@Result", 0)

        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[web].[USP_PhotoGallery]", CommandType.StoredProcedure, Para.ToArray()));

        }
        public async Task<DataTable> GetUploadedPhotoList(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_PhotoGallery]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Digital Notice Board
        public async Task<DataTable> GetDigitalNoticeBoard(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                     new SqlParameter("@RelationshipId",obj.RelationshipId)
                 };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalNoticeBoard", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Banner Master
        public async Task<string> InsertUpdateDeleteBannerMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@BannerMasterCode",obj.ImageIds),
                    new SqlParameter("@LayoutId",obj.LayoutCode),
                    new SqlParameter("@LayoutPartId",obj.LayoutPartId),
                    new SqlParameter("@TabId",obj.TabId),
                    new SqlParameter("@MenuId", obj.MenuId),
                    new SqlParameter("@SubMenuId",obj.SubMenuId),
                    new SqlParameter("@UnitId",obj.UnitId),
                    new SqlParameter("@BannerTitle", obj.BannerTitle),
                    new SqlParameter("@BannerType",obj.BannerType),
                    new SqlParameter("@BannerImageName", obj.BannerImageName),
                    new SqlParameter("@BannerImageExt",obj.BannerImageExt),
                    new SqlParameter("@BannerImagePath",obj.BannerImagePath),
                    new SqlParameter("@BannerAltText",obj.BannerAltText),
                    new SqlParameter("@Slogan",obj.Slogan),
                    new SqlParameter("@SloganImagePath",obj.SloganImagePath),
                    new SqlParameter("@BannerUrl", obj.URL),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@IsApproved", obj.IsApproved),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@BannerDescription1",obj.BannerDescription1),
                    new SqlParameter("@BannerDescription2",obj.BannerDescription2),
                    new SqlParameter("@PageBannerCategoryCode",obj.PageBannerCategoryCode),
                    new SqlParameter("@EventFromDate",obj.EventFromDate),
                    new SqlParameter("@Location",obj.Location),
                    new SqlParameter("@ImageHeight",obj.ImageHeight),
                    new SqlParameter("@ImageObjectFit",obj.ImageObjectFit),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteBannerMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBanner(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
               new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@LayoutId",obj.LayoutCode),
                    new SqlParameter("@LayoutPartId",obj.LayoutPartId),
                    new SqlParameter("@TabId",obj.TabId),
                    new SqlParameter("@MenuId", obj.MenuId),
                    new SqlParameter("@SubMenuId",obj.SubMenuId),
                    new SqlParameter("@UnitId",obj.UnitId),
                    new SqlParameter("@BannerTitle", obj.BannerTitle),
                    new SqlParameter("@BannerType",obj.BannerType),
                    new SqlParameter("@BannerImageName", obj.BannerImageName),
                    new SqlParameter("@BannerImageExt",obj.BannerImageExt),
                    new SqlParameter("@BannerImagePath",obj.BannerImagePath),
                    new SqlParameter("@BannerAltText",obj.BannerAltText),
                    new SqlParameter("@Slogan",obj.Slogan),
                    new SqlParameter("@SloganImagePath",obj.SloganImagePath),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@IsApproved",obj.IsApproved),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@BannerDescription1",obj.BannerDescription1),
                    new SqlParameter("@BannerDescription2",obj.BannerDescription2),
                    new SqlParameter("@PageBannerCategoryCode",obj.PageBannerCategoryCode),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy)
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteBannerMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region ContactUs
        public async Task<string> InsertContactUs(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Name", obj.Name),
                    new SqlParameter("@Email",obj.Email),
                    new SqlParameter("@Subject",obj.Subject),
                    new SqlParameter("@Message",obj.Message),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@Class",obj.Class),
                    new SqlParameter("@ContactNo",obj.Contact),
                     new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_ContactusByWebsite]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Insert Contact Us Master Content

        public async Task<string> InsertUpdateDeleteContactUsMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@UnitCode",obj.UnitId),
                    new SqlParameter("@LayoutCode",obj.LayoutCode),
                    new SqlParameter("@LayoutPartCode",obj.LayoutPartId),
                    new SqlParameter("@TabCode",obj.TabId),
                    new SqlParameter("@MenuCode", obj.MenuId),
                    new SqlParameter("@SubMenuCode",obj.SubMenuId),
                    new SqlParameter("@MobileNoText",obj.BodyContentMobileNoText),
                    new SqlParameter("@EmailText",obj.BodyContentEmailText),
                    new SqlParameter("@TimingText",obj.BodyContentTimingText),
                    new SqlParameter("@AddressText",obj.BodyContentAddressText),
                    new SqlParameter("@IsApproved", obj.IsApproved),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@SkypeAddress",obj.SkypeAddress),
                    new SqlParameter("@FacebookLink",obj.FacebookLink),
                    new SqlParameter("@InstagramLink",obj.InstaLink),
                    new SqlParameter("@LinkedInLink",obj.LinkedInLink),
                    new SqlParameter("@YoutubeLink",obj.YoutubeLink),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteContactUsContentMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetContactUsContentMaster(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@UnitCode",obj.UnitId),
                    new SqlParameter("@LayoutCode",obj.LayoutCode),
                    new SqlParameter("@LayoutPartCode",obj.LayoutPartId),
                    new SqlParameter("@TabCode",obj.TabId),
                    new SqlParameter("@MenuCode", obj.MenuId),
                    new SqlParameter("@SubMenuCode",obj.SubMenuId),
                    new SqlParameter("@MobileNoText",obj.BodyContentMobileNoText),
                    new SqlParameter("@EmailText",obj.BodyContentEmailText),
                    new SqlParameter("@TimingText",obj.BodyContentTimingText),
                    new SqlParameter("@AddressText",obj.BodyContentAddressText),
                    new SqlParameter("@IsApproved", obj.IsApproved),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteContactUsContentMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Theme Master
        public async Task<string> InsertUpdateDeleteThemeMaster(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@TopHeaderFirstLineColour",obj.TopHeaderFirstLineColour),
                    new SqlParameter("@TopHeaderFirstLineTextColour",obj.TopHeaderFirstLineTextColour),
                    new SqlParameter("@TopHeaderFirstLineIconColour",obj.TopHeaderFirstLineIconColour),
                    new SqlParameter("@TopHeaderSecondLineColour",obj.TopHeaderSecondLineColour),
                    new SqlParameter("@TopHeaderSecondLineTextColour", obj.TopHeaderSecondLineTextColour),
                    new SqlParameter("@TopHeaderSecondLineIconColour",obj.TopHeaderSecondLineIconColour),
                    new SqlParameter("@BannerBottomLineTextColour",obj.BannerBottomLineTextColour),
                    new SqlParameter("@WhyChooseHeadingTextColour",obj.WhyChooseHeadingTextColour),
                    new SqlParameter("@OurProgramsHeadingTextColour",obj.OurProgramsHeadingTextColour),
                    new SqlParameter("@OurProgramsSliderHeadingTextColour",obj.OurProgramsSliderHeadingTextColour),
                    new SqlParameter("@ClassesHeadingTextColour", obj.ClassesHeadingTextColour),
                    new SqlParameter("@ClassesImageHeadingTextColour",obj.ClassesImageHeadingTextColour),
                    new SqlParameter("@EventsHeadingTextColour",obj.EventsHeadingTextColour),
                    new SqlParameter("@EventsSliderHeadingTextColour",obj.EventsSliderHeadingTextColour),
                    new SqlParameter("@WinningLaurelsHeadingTextColour",obj.WinningLaurelsHeadingTextColour),
                    new SqlParameter("@BulletinHeadingTextColour",obj.BulletinHeadingTextColour),
                    new SqlParameter("@OurHappyParentsHeadingTextColour",obj.OurHappyParentsHeadingTextColour),
                    new SqlParameter("@OurGroupInstitutionsHeadingTextColour",obj.OurGroupInstitutionsHeadingTextColour),
                    new SqlParameter("@FacebookfeedssHeadingTextColour",obj.FacebookfeedssHeadingTextColour),
                    new SqlParameter("@YouTubeHeadingTextColour",obj.YouTubeHeadingTextColour),
                    new SqlParameter("@ContactUsHeadingTextColour",obj.ContactUsHeadingTextColour),
                    new SqlParameter("@VisitorCount",obj.VisitorCount),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[STP_Insert_ThemeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTheme(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code", obj.Code),
                    new SqlParameter("@RelationShipId", obj.RelationshipId),
                    new SqlParameter("@Result", "")
             };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[STP_Insert_ThemeMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Session List
        public async Task<DataTable> GetSession(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRelationshipId(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@brancurl",obj.BranchUrl)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region insert Video Album
        public async Task<string> InsertVideoAlbum(BALDynamicWebsite obj)
        {
            var Param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitId",obj.UnitId),
                new SqlParameter("@Title",obj.AlbumName),
                new SqlParameter("@AlbumIcon",obj.AlbumIcon),
                new SqlParameter("@EventDate",obj.EventDate),
                new SqlParameter("@Description",obj.Description),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@PhotoGalleryType",obj.PhotoGalleryType),
                new SqlParameter("@ShownOn",obj.ShownOn),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@Result", 0),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[web].[USP_VideoAlbum]", CommandType.StoredProcedure, Param.ToArray()));
        }
        #endregion

        #region Upload Video 
        public async Task<string> UploadVideoUrl(BALDynamicWebsite obj)
        {

            var Param = new List<SqlParameter>
       {
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@Code", obj.TransId),
                new SqlParameter("@thumbImgInput", obj.thumbImgInput),
                //new SqlParameter("@Headline", obj.Headline),
                new SqlParameter("@UpdatedBy", obj.UpdatedBy),
                new SqlParameter("@YouTubeVideoUrl",obj.VideoUrl),
                //new SqlParameter("@DisplayCode",obj.DisplayCode),
                new SqlParameter("@Action",obj.Action),
                //new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Title",obj.AlbumName),
                new SqlParameter("@CreatedBy", obj.CreatedBy),
                //new SqlParameter("@UpdatedBy", obj.UpdatedBy),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@Result", 0)
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[web].[USP_VideoGallary]", CommandType.StoredProcedure, Param.ToArray()));
        }
        public async Task<DataTable> GetUploadedVideoList(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),

            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_VideoGallary]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Media File uploading
        public async Task<string> InsertUpdateDeleteMediaFile(BALDynamicWebsite obj)
        {

            var Param = new List<SqlParameter>
       {
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@Code", obj.TransId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Title",obj.UnitTitle),
                new SqlParameter("@EventDate",obj.EventDate),
                new SqlParameter("@Venue",obj.Location),
                new SqlParameter("@Pdffile",obj.MediaId),
                new SqlParameter("@Mediafile",obj.ImageId),
                new SqlParameter("@UpdatedBy", obj.UpdatedBy),
                new SqlParameter("@Description",obj.Description),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@MediaGallaryType",obj.PhotoGalleryType),

                new SqlParameter("@Result", 0)
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[web].[USP_MediaGallery]", CommandType.StoredProcedure, Param.ToArray()));
        }

        public async Task<DataTable> GetMediaFiles(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@MenuId",obj.MenuId),
                new SqlParameter("@SubMenuId",obj.SubMenuId),
                new SqlParameter("@PhotoGalleryType",obj.PhotoGalleryType),

            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_MediaGallery]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        //public async Task<DataTable> GetPhotoGallery(BALDynamicWebsite obj)
        //{
        //    DataTable dt;
        //    var param = new List<SqlParameter>
        //    {
        //        new SqlParameter("@PGTransId", obj.PGTransId),
        //        new SqlParameter("@UnitId", obj.UnitId),
        //        new SqlParameter("@Action",obj.Action),
        //        new SqlParameter("@RelationShipId",obj.RelationshipId),
        //        new SqlParameter("@MenuId",obj.MenuId),
        //        new SqlParameter("@SubMenuId",obj.SubMenuId),
        //        new SqlParameter("@PhotoGalleryType",obj.PhotoGalleryType),

        //    };
        //    dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_MediaGallery]", CommandType.StoredProcedure, param.ToArray()));
        //    return dt;
        //}

        #endregion
        #region Media File uploading
        public async Task<string> InsertUpdateDeleteDocsAndInfo(BALDynamicWebsite obj)
        {

            var Param = new List<SqlParameter>
       {
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Description", obj.Description),
                new SqlParameter("@PdfFilePath",obj.MediaId),
                new SqlParameter("@DisplayCode",obj.DisplayCode),
                new SqlParameter("@TextValue",obj.Remarks),
                new SqlParameter("@MenuId",obj.MenuId),
                new SqlParameter("@SubMenuId",obj.SubMenuId),
                new SqlParameter("@TabId",obj.TabId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Title",obj.AlbumName),
                new SqlParameter("@URLType",obj.URLType),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy", obj.CreatedBy),
                new SqlParameter("@UpdatedBy", obj.UpdatedBy),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@Result", 0)
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[web].[USP_DocsAndInfo]", CommandType.StoredProcedure, Param.ToArray()));
        }

        public async Task<DataTable> GetDocsAndInfo(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                //new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@MenuId",obj.MenuId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_DocsAndInfo]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Erp Login
        public async Task<DataTable> GetErpLogin(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@BranchUrl",obj.BranchUrl)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_BranchMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region ContactUs
        public async Task<string> InsertCareer(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                  new SqlParameter("@Name", obj.Name),
                    new SqlParameter("@Email",obj.Email),
                    new SqlParameter("@Skills",obj.Skills),
                    new SqlParameter("@PdfFilePath",obj.MediaId),
                    new SqlParameter("@ContactNo",obj.Contact),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_Career]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Top Ribon Social Media  and Other Link
        public async Task<string> InsertUpdateDeleteTopSocialMediaLink(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Code", obj.Code),
                    new SqlParameter("@UnitId",obj.UnitId),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                    new SqlParameter("@Alignment",obj.Alignment),
                    new SqlParameter("@CaptionName",obj.CaptionName),
                    new SqlParameter("@CaptionIcon",obj.PhotoId),
                    new SqlParameter("@CaptionLink",obj.CaptionLink),
                    new SqlParameter("@IsApproved",obj.IsApproved),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_TopHeaderLink]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTopSocialMediaLink(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_TopHeaderLink]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion

        #region Top Header Data
        public async Task<DataTable> GetTopHeaderData(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@UnitId", obj.UnitId),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@RelationShipId",obj.RelationshipId),

                };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_TopHeaderLink]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion

        #region Get Logo Image
        public async Task<DataTable> GetLogoImage(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                
                //new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteUnitMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion

        #region Left & Right Sidebar Link
        public async Task<string> InsertUpdateDeleteSidebarLink(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Code", obj.Code),
                    new SqlParameter("@UnitId",obj.UnitId),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                    new SqlParameter("@Alignment",obj.Alignment),
                    new SqlParameter("@CaptionName",obj.CaptionName),
                    new SqlParameter("@CaptionIcon",obj.PhotoId),
                    new SqlParameter("@CaptionLink",obj.CaptionLink),
                    new SqlParameter("@IsApproved",obj.IsApproved),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Result","")

                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_LeftRightSidebarLink]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSidebarLink(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@UnitTypeCode", obj.UnitTypeCode),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_LeftRightSidebarLink]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        #endregion
        #region Get Sidebar Link Data
        public async Task<DataTable> GetSidebarLinkData(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),

            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_LeftRightSidebarLink]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Side Bar On Home Page
        public async Task<string> InsertUpdateDeleteSideBarContent(BALDynamicWebsite obj)
        {

            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Code", obj.Code),
                    new SqlParameter("@UnitId",obj.UnitId),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@UnitTypeCode",obj.UnitTypeCode),
                    //new SqlParameter("@TabAlignment",obj.Alignment),
                    new SqlParameter("@CaptionName",obj.CaptionName),
                    ///new SqlParameter("@CaptionLink",obj.CaptionLink),
                    new SqlParameter("@TargetLayoutCode", obj.LayoutCode),
                    new SqlParameter("@TargetUnitId",obj.TargetUnitId),
                    new SqlParameter("@CaptionLink",obj.CaptionLink),
                    new SqlParameter("@Attachment",obj.Attachment),
                    new SqlParameter("@TabAlignment",obj.TabAlignment),
                    new SqlParameter("@SeqNo", obj.SeqNo),
                    new SqlParameter("@IsApproved",obj.IsApproved),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Result","")

                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteSideBarContent]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSideBarContent(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                //new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteSideBarContent]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion

        public async Task<DataTable> GetImageGallary(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                //new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@TabId",obj.TabId),
                //new SqlParameter("@SubMenuId",obj.SubMenuId),

            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_PhotoAlbum]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataSet> GetImageData(BALDynamicWebsite obj)
        {
            DataSet dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@MediaGallaryType",obj.PhotoGalleryType)
                //new SqlParameter("@SubMenuId",obj.SubMenuId),

            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[web].[USP_MediaGallery]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        public async Task<string> InsertUpdateDeleteAccordianLayout(BALDynamicWebsite obj)
        {
            try
            {
                var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuCode",obj.MenuId),
                new SqlParameter("@SubMenuCode", obj.SubMenuId),
                new SqlParameter("@AccordianName",obj.AccordianName),
                new SqlParameter("@OrderBy", obj.SeqNo),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result","")
            };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_AccordianContent]", CommandType.StoredProcedure, param.ToArray()));
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        public async Task<DataTable> GetAccordianLayout(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuCode",obj.MenuId),
                new SqlParameter("@SubMenuCode", obj.SubMenuId),
                new SqlParameter("@AccordianName",obj.AccordianName),
                new SqlParameter("@OrderBy", obj.SeqNo),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_AccordianContent]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        public async Task<string> InsertUpdateDeleteAccordianContentLayout(BALDynamicWebsite obj)
        {
            try
            {
                var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@AccordianCode",obj.AccordianCode),
                new SqlParameter("@AccordianContentHeading",obj.AccordianContentHeading),
                new SqlParameter("@AccordianContent", obj.AccordianContent),
                new SqlParameter("@SequenceNo", obj.SeqNo),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@ImgPath",obj.PhotoId),
                new SqlParameter("@ImgSequence",obj.ImgSequence),
                new SqlParameter("@PageLinkList",obj.PageLinkList),
                new SqlParameter("@IsBanner",obj.IsBanner),
                new SqlParameter("@IsSlider",obj.IsSlider),
                new SqlParameter("@Result","")
            };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_AccordianDetail]", CommandType.StoredProcedure, param.ToArray()));
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        public async Task<DataTable> GetAccordianContentLayout(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@AccordianCode",obj.AccordianCode),
                new SqlParameter("@AccordianContentHeading",obj.AccordianContentHeading),
                new SqlParameter("@AccordianContent", obj.AccordianContent),
                new SqlParameter("@SequenceNo", obj.SeqNo),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Result","")
            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_AccordianDetail]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataTable> GetWebsiteUrl(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId", obj.RelationshipId),

            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_AccordianDetail]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataTable> GetBranchName(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId", obj.RelationshipId),

            };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_BranchMaster]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<string> InsertUpdateDeleteMediaImageFile(BALDynamicWebsite obj)
        {

            var Param = new List<SqlParameter>
            {
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@Code", obj.TransId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Headline",obj.UnitTitle),
                new SqlParameter("@EventDate",obj.EventDate),
                new SqlParameter("@Venue",obj.Location),
                new SqlParameter("@PhotoIdList",obj.ImageId),
                new SqlParameter("@UpdatedBy", obj.UpdatedBy),
                new SqlParameter("@Description",obj.Description),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@Result", 0)
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_PhotoGallery]", CommandType.StoredProcedure, Param.ToArray()));
        }
        public async Task<DataTable> GetMediaImageFiles(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PGTransId", obj.PGTransId),
                new SqlParameter("@UnitId", obj.UnitId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@MenuId",obj.MenuId),
                new SqlParameter("@SubMenuId",obj.SubMenuId),
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_PhotoGallery]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #region Body Content Master List
        public async Task<string> InsertUpdateDeleteMultipleBodyContent(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                    new SqlParameter("@UnitCode",obj.UnitId),
                    new SqlParameter("@LayoutCode", obj.LayoutCode),
                    new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                    new SqlParameter("@TabCode",obj.TabId),
                    new SqlParameter("@MenuCode",obj.MenuId),
                    new SqlParameter("@SubMenuCode",obj.SubMenuId),
                    new SqlParameter("@BodyContent",obj.BodyContent),
                    new SqlParameter("@IsApproved", obj.IsApproved),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@ImgPath",obj.ImgPath),
                    new SqlParameter("@ImgAlign",obj.ImgAlign),
                    new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                    new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                    new SqlParameter("@LayoutPartAbbreviationName",obj.LayoutPartAbbreviationName),
                    new SqlParameter("@HeadingImageHeight",obj.HeadingImageHeight),
                    new SqlParameter("@ImageHeight",obj.ImageHeight),
                    new SqlParameter("@ImageWidth",obj.ImageWidth),
                    new SqlParameter("@ImageObjectFit",obj.ImageObjectFit),
                    new SqlParameter("@ImageBorder",obj.ImageBorder),
                    new SqlParameter("@ImageBorderRadius",obj.ImageBorderRadius),
                    new SqlParameter("@ImgPathFiles",obj.PhotoId),
                    new SqlParameter("@OrderBy",obj.OrderBy),
                    new SqlParameter("@PageLinkList",obj.PageLinkList),
                    new SqlParameter("@IsBanner",obj.IsBanner),
                    new SqlParameter("@IsSlider",obj.IsSlider),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[web].[USP_InsertUpdateDeleteMultipleBodyContent]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBodyContentMultiple(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                    new SqlParameter("@UnitCode",obj.UnitId),
                    new SqlParameter("@LayoutCode", obj.LayoutCode),
                    new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                    new SqlParameter("@TabCode",obj.TabId),
                    new SqlParameter("@MenuCode",obj.MenuId),
                    new SqlParameter("@SubMenuCode",obj.SubMenuId),
                    new SqlParameter("@BodyContent",obj.BodyContent),
                    new SqlParameter("@IsApproved", obj.IsApproved),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@ImgPath",obj.ImgPath),
                    new SqlParameter("@ImgAlign",obj.ImgAlign),
                    new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                    new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                    new SqlParameter("@LayoutPartAbbreviationName",obj.LayoutPartAbbreviationName),
                    new SqlParameter("@HeadingImageHeight",obj.HeadingImageHeight),
                    new SqlParameter("@ImageHeight",obj.ImageHeight),
                    new SqlParameter("@Result","")
                 };

            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteMultipleBodyContent]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataSet> GetBodyCenterContentMultipleWithSlider(BALDynamicWebsite obj)
        {
            DataSet ds;
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                    new SqlParameter("@UnitCode",obj.UnitId),
                    new SqlParameter("@LayoutCode", obj.LayoutCode),
                    new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                    new SqlParameter("@TabCode",obj.TabId),
                    new SqlParameter("@MenuCode",obj.MenuId),
                    new SqlParameter("@SubMenuCode",obj.SubMenuId),
                    new SqlParameter("@BodyContent",obj.BodyContent),
                    new SqlParameter("@IsApproved", obj.IsApproved),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@Remarks",obj.Remarks),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@ImgPath",obj.ImgPath),
                    new SqlParameter("@ImgAlign",obj.ImgAlign),
                    new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                    new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                    new SqlParameter("@Result","")
                };

            ds = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[web].[USP_InsertUpdateDeleteMultipleBodyContent]", CommandType.StoredProcedure, param.ToArray()));
            return ds;
        }

        public async Task<DataTable> GetUploadedPhotoListBodyContent(BALDynamicWebsite obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@BodyContentIds",obj.BodyContentIds),
                new SqlParameter("@UnitCode",obj.UnitId),
                new SqlParameter("@LayoutCode", obj.LayoutCode),
                new SqlParameter("@LayoutPartCode", obj.LayoutPartId),
                new SqlParameter("@TabCode",obj.TabId),
                new SqlParameter("@MenuCode",obj.MenuId),
                new SqlParameter("@SubMenuCode",obj.SubMenuId),
                new SqlParameter("@BodyContent",obj.BodyContent),
                new SqlParameter("@IsApproved", obj.IsApproved),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@ImgPath",obj.ImgPath),
                new SqlParameter("@ImgAlign",obj.ImgAlign),
                new SqlParameter("@BodyContentHeadingImgPath",obj.BodyContentHeadingImgPath),
                new SqlParameter("@BodyContentHeadingText",obj.BodyContentHeadingText),
                new SqlParameter("@LayoutPartAbbreviationName",obj.LayoutPartAbbreviationName),
                new SqlParameter("@HeadingImageHeight",obj.HeadingImageHeight),
                new SqlParameter("@ImageHeight",obj.ImageHeight),
                new SqlParameter("@ImageWidth",obj.ImageWidth),
                new SqlParameter("@ImageObjectFit",obj.ImageObjectFit),
                new SqlParameter("@ImageBorder",obj.ImageBorder),
                new SqlParameter("@ImageBorderRadius",obj.ImageBorderRadius),
                new SqlParameter("@ImgPathFiles",obj.PhotoId),
                new SqlParameter("@OrderBy",obj.OrderBy),
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[web].[USP_InsertUpdateDeleteMultipleBodyContent]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion
        #region Apply Job From Website
        public async Task<string> InsertApplyJob(BALDynamicWebsite obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@JobPostingTransID", obj.JobPostingTransID),
                    new SqlParameter("@CandidateName",obj.CandidateName),
                    new SqlParameter("@FatherName",obj.FatherName),
                    new SqlParameter("@MotherName",obj.MotherName),
                    new SqlParameter("@Gender",obj.Gender),
                    new SqlParameter("@AadharNo",obj.AadharNo),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                    new SqlParameter("@CurrentCTC",obj.CurrentCTC),
                    new SqlParameter("@ExpectedCTC",obj.ExpectedCTC),
                    new SqlParameter("@NoticePeriod",obj.NoticePeriod),
                    new SqlParameter("@CurrentOrganization",obj.CurrentOrganization),
                    new SqlParameter("@PermanentAddress",obj.PermanentAddress),
                    new SqlParameter("@StateCode",obj.StateCode),
                    new SqlParameter("@CityCode",obj.CityCode),
                    new SqlParameter("@PanCardNo",obj.PanCardNo),
                    new SqlParameter("@MobileNo",obj.MobileNo),
                    new SqlParameter("@ResidentialAddress",obj.ResidentialAddress),
                    new SqlParameter("@ResidentialStateCode",obj.ResidentialStateCode),
                    new SqlParameter("@ResidentialCityCode",obj.ResidentialCityCode),
                    new SqlParameter("@EmailId",obj.EmailId),
                    new SqlParameter("@AcademicDetails",obj.AcademicDetails),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@CVPath",obj.CVPath),
                    new SqlParameter("@ProfileImagePath",obj.ImgPath),
                    new SqlParameter("@TotalExperience",obj.TotalExperience),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQuery("[trans].[USP_InsertUpdateDeleteCandidateAppliedJob]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }
}