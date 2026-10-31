app.AllHomeWorkController = function ($scope, $element, $filter, myService) {

    //$scope.Url = function (val) {
    //    return $sce.trustAsResourceUrl(val);
    //};

    $scope.BindAllHomeWork = function () {
        
        $('#LoaderHomework').show();
        var collectionobj = {};
        collectionobj.Action = '13';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.StudentCode = userid;
        collectionobj.TransID = $('#HdnTransId').val();
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetAllHomeWorkExecptTransId", collectionobj);
        getData.then(function (response) {
            
            $scope.AllHomeWork = response.data;
            $scope.HomeWorkListCount = $scope.AllHomeWork.length;
            $('#LoaderHomework').hide();
            if ($('#HdnTransId').val() == "") {
                $('#HdnTransId').val($scope.AllHomeWork[0].TransId);
            }
            $scope.ActiveHomeWorkId = $('#HdnTransId').val();
            $scope.checkwidth();
        });
    };

    $scope.BindAllHomeWork();

    $scope.BindSelectedHomeWork = function () {
        
        $('#LoaderHomework').show();
        var collectionobj = {};
        collectionobj.Action = '15';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.StudentCode = userid;

        if ($('#HdnTransId').val() == '') {
            collectionobj.TransID = '1';
        }
        else { collectionobj.TransID = $('#HdnTransId').val(); }
        //$('#VedioStu').val($scope.StudentCode);

        
        var getData = myService.methode('POST', "../api/HomeworkApi/GetAllHomeWorkExecptTransId", collectionobj);
        getData.then(function (response) {
        
            if (response.data.length > 0) {

                $scope.SelectHomeWork = response.data;
                $scope.IsReSubmittion = response.data[0].IsReSubmittion;
                if (response.data[0].IsApproved == '1') {
                    $('#dvVedioApprove').attr('style', 'display:block');

                    $('#VedioTrans').val(response.data[0].TransId);
                    $scope.VedioPath = response.data[0].VedioPath;

                }
                else {
                    $('#dvVedioApprove').attr('style', 'display:none');
                }

                $('#LoaderHomework').hide();

                if (response.data.length > 0) {
                    if (response.data[0].IsSubmissionRequired == '1') {
                        $scope.IsSubmissionRequired = response.data[0].IsSubmissionRequired
                        $scope.IsHomeworkSubmitted = response.data[0].IsHomeworkSubmitted;
                    }
                    else {
                        $scope.IsSubmissionRequired = '0'
                    }
                }
                else
                    $scope.IsHomeworkSubmitted = false;

            }

        });

    };

    //$scope.BindAllHomeWork();

    $scope.reply_click = function (clicked_id) {
        
        $('.br-msg-box-list-item').removeClass('active');
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }

        $('#HdnTransId').val(clicked_id);
        $scope.Attachments = [{ Attachment: "" }];
        $scope.BindSelectedHomeWork();
        $scope.BindAllHomeWork();
        $('#MainMoveBoxMobile').addClass("MainMoveBoxMobile");

    }

    $scope.Attachments = [{ Attachment: "" }];


    $scope.checkwidth = function () {
        //debugger;

        setTimeout(function () {

            //debugger;
            var InW = $(window).width();
            var InH = $(window).height();
            $('#QueryScrollControl').css({ "height": 0 });
            var headerHeight = $("#QHeaderHight").height();

            var AddHeight = (isNaN(headerHeight) || headerHeight == null) ? 0 : parseInt(headerHeight);

            if (AddHeight == 0) {
                $('.body-details-scorll').css({ "height": (InH - 179) });
                $(".query-show-body").css({ "height": (InH - 159) });
            }
            else {
                AddHeight = AddHeight - 19;
                $('.body-details-scorll').css({ "height": (InH - (179 + AddHeight)) });
                $(".query-show-body").css({ "height": (InH - (159 + AddHeight)) });
            }
        }, 300);
    }

    $scope.$applyAsync();
    $scope.AddRow = function () {

        if ($scope.Attachments.length == 10)
            showMsgBox("Maximum 10 attachments are allowed.");
        else {
            $scope.Attachments.push({ Attachment: "" })
        }
    }

    $scope.RemoveRow = function (index) {
        $scope.filterList = [];
        $.each($scope.Attachments, function (i, array) {
            if (i != index) {
                $scope.filterList.push(array)
            }
        })
        $scope.Attachments = $scope.filterList;
    }

    $scope.index = 0;
    $scope.Attachments = []

 
    $scope.$on("seletedFile", function (event, args) {

        var sum = 0;
        $scope.$apply(function () {
            if (args.file.type.contains("jpg") || args.file.type.contains("jpeg") || args.file.type.contains("bmp") || args.file.type.contains("png") || args.file.type.contains("pdf") || args.file.type.contains("mp4") || args.file.type.contains("mp3")) {

                $scope.Attachments[$scope.index] = args.file;

            }
            else {
                showMsgBox('Only .jpg|.jpeg|.bmp|.png|.pdf Files Accepted')
            }
        });
    });

    $scope.SetIndex = function (index) {
        $scope.index = index;
    }

    $scope.GetAttachmentName = function (name) {
       
        var collectionobj = {};
        if (name.Attachment.length > 0) {
            var splits = name.Attachment.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename = splitsids[1]
        }
        if (name.Attachment2.length > 0)
        {
            var splits = name.Attachment2.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename2 = splitsids[1]
        }
        if (name.Attachment3.length > 0) {
            var splits = name.Attachment3.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename3 = splitsids[1]
        }
        if (name.Attachment4.length > 0) {
            var splits = name.Attachment4.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename4 = splitsids[1]
        }
        if (name.Attachment5.length > 0) {
            var splits = name.Attachment5.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename5 = splitsids[1]
        }
        if (name.Attachment6.length > 0) {
            var splits = name.Attachment6.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename6 = splitsids[1]
        }
      if (name.Attachment7.length > 0) {
            var splits = name.Attachment7.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename7 = splitsids[1]
        }
      if (name.Attachment8.length > 0) {
            var splits = name.Attachment8.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename8 = splitsids[1]
        }
      if (name.Attachment9.length > 0) {
            var splits = name.Attachment9.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename9 = splitsids[1]
        }
        if (name.Attachment10.length > 0) {
            var splits = name.Attachment10.split('/');
            var splitsids = [];
            if (splits.length > 3) {
                splitsids = splits[3].split('_');
                if (splitsids.length > 0)
                    collectionobj.Language = splitsids[0];
            }
            $scope.filename10 = splitsids[1]
        }
    }


    $scope.SubmittedHomework = function () {
        debugger
        if ($scope.Attachments[0].Attachment!='') {
            var collectionobj = {};
            var AttachmentList = [];
            var NameList = [];
            var seprator = "";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;

            collectionobj.StudentCode = userid;
            collectionobj.TransID = $('#HdnTransId').val();
            collectionobj.Action = '29';
            var getData = myService.postmethode('POST', '../Api/HomeworkApi/HomeWorkSubmittedbyStudent', collectionobj, $scope.Attachments);
            getData.then(function (response) {
                showMsgBox(response.data);
                $('#pdfAttachment').val("");

                $scope.Attachments = [{ Attachment: "" }];
                $scope.BindSelectedHomeWork();
                
            });
        } else { showMsgBox("Please Select Atleast one file(pdf or image or video or audio).") }
    }
    //-----------------------------------------------------------------------------End
}