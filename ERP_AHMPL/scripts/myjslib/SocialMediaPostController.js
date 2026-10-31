app.SocialMediaPostController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtPostName');
    $scope.DateTo = "";
    $scope.SocialMediaPost = [];
    
    $scope.files = [];

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.PublishDate = moment($scope.DateOfCreation).format('YYYY-MMM-DD');
            collectionobj.NameofEvent = $scope.PostName;
            collectionobj.Description = $scope.Description;
            collectionobj.DateOfActivation = moment($scope.DateOfActivation).format('YYYY-MMM-DD');
            collectionobj.DateOfDeactivation = moment($scope.DateOfDeActivation).format('YYYY-MMM-DD');
            collectionobj.ImageUrl = $scope.fileInput;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.DisplayCode = displayCode;
            collectionobj.FYId = fyId;        
            collectionobj.SessionId = sessionId;
            collectionobj.CreatedBy = userid;
            collectionobj.PlatformData = JSON.stringify($filter('filter')($scope.SocialMediaPost, { IsActive: true }));
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else {
                collectionobj.Action = "2";

            }
            var getData = myService.postmethode('POST', '../Api/SocialMediaPostApi/InsertUpdateDeleteSocialMediaPost', collectionobj, $scope.files);
            getData.then(function (response)
            {
                var result = response.data.split('_');
                if (result.length > 1) {
                    var collectionobj = {};
                    $scope.hfId = result[1];
                    collectionobj.TransID = $scope.hfId;
                    collectionobj.Action = "9";
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.SessionId = sessionId;
                    var getData = myService.methode('POST', '../Api/SocialMediaPostApi/GetSocialMediaPost', collectionobj);
                    getData.then(function (response) {
                        if (response.data.length > 0) {
                            showMsgBox("1");
                            $scope.SocialMediaPost = response.data;
                            $scope.Save = "Save"
                        }
                    });
                }
                else {
                    showMsgBox("Sorry record not saved.");
                }
               
            });
        }
    };

    $scope.OpenFileUpload = function () {
        $('#fileInput').click();
    }
    $scope.fuImageChange = function (input) {
        readURL(input);
    };
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInput = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(document).on("click", ".RefreshSearchTable", function (e) {

        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });


    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '/Api/SocialMediaPostApi/GetSocialMediaPost', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Post Name", "HeaderValue": "NameofPost", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Description", "HeaderValue": "Description", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Activated On", "HeaderValue": "DateofActivation", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Created On", "HeaderValue": "DateofCreation", "Width": "140px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "De-Activated On", "HeaderValue": "DateofDeactivation", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                   
                ];
            $scope.SocialMediaPostList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SocialMediaPostList = $filter('filter')($scope.SocialMediaPostList, { 'TransId': $scope.hfId }, true);
           
                $scope.PostName = $scope.SocialMediaPostList[0].NameofPost;
                $scope.Description = $scope.SocialMediaPostList[0].Description;
                $scope.DateOfCreation = new Date($scope.SocialMediaPostList[0].DateofCreation);
                $scope.DateOfActivation = new Date($scope.SocialMediaPostList[0].DateofActivation);
                $scope.DateOfDeActivation = new Date($scope.SocialMediaPostList[0].DateofDeactivation);
                $scope.imgfileInput = $scope.SocialMediaPostList[0].ImageUrl;

                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.Action = "9";
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/SocialMediaPostApi/GetSocialMediaPost', collectionobj);
                getData.then(function (response) {
                    $scope.SocialMediaPost = response.data;
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtPostName', true);
            });
        });

    }
    $scope.GenerateLink = function (obj) {
        debugger
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.TransId = obj.EnquiryCode;
       var getData = myService.methode('Post', '/Api/SocialMediaPostApi/GetSocialMediaPostLink', collectionobj);
        getData.then(function (response) {
            debugger
            //var Url = 'http//:' + response.data[0].BranchUrl + '/' + 'Enquiry' + '/' + 'GetEnquiry' + '?'// + obj.TransID;
            var Url = response.data[0].BranchUrl + '/' + 'Site' + '/' + 'AdmissionEnquiry' + '?'// + obj.TransID;
            obj.Url = Url;
            obj.Links = Url;
        });
    }
    $scope.CopyText = function (obj) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(obj.Url).select();
        document.execCommand("copy");
        $temp.remove();
        alert('Text Copied');
    }

    $scope.GetSocialMediaData = function () {
        var collectionobj = {};
        collectionobj.Action = 8;
        var getData = myService.methode('POST', '/Api/SocialMediaPostApi/GetSocialMediaData', collectionobj);
        getData.then(function (response) {

            $scope.SocialMediaPost = response.data;

        });
    }

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {}
        collectionobj.Action = '3';
        collectionobj.TransID = $scope.hfId;
        collectionobj.IsDeleted = 1
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        //collectionobj.IsChk = obj.IsChk, { IsActive: true }
        var getData = myService.methode('POST', '/Api/SocialMediaPostApi/InsertUpdateDeleteSocialMediaPost', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.SocialMediaPost = [];
        $scope.DateOfCreation = "";
        $scope.PostName = "";
        $scope.Description = "";
        $scope.DateOfActivation = "";
        $scope.DateOfDeActivation = "";
        $('#fileInput').val("");
        $scope.fileInput = "";
        $('#imgfileInput').attr("src","../Content/noimage.png");
        $scope.GetSocialMediaData();
        $scope.$applyAsync();
        $scope.SetFocus('#ddlUser');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

}


