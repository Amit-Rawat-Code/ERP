app.service("myService", function ($http) {

    this.methode = function (methodType, virtualUrl, dataList) {
        //debugger
        var response = $http({
            method: methodType,
            url: virtualUrl,
            data: dataList,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json'
        });

        return response;
    };

    this.postmethode = function (methodType, virtualUrl, dataList,files) {

        var response = $http({
            method: methodType,
            url: virtualUrl,
            headers: { 'Content-Type': undefined },
            data: { model: dataList, filesmodel: files } , 
            transformRequest: function (data) {
                var formData = new FormData();
              
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.filesmodel.length; i++) {
                    formData.append("file" + i, data.filesmodel[i]);
                    console.log("file" + i,data.filesmodel[i]);
                }
                for (var i of formData)
                console.log(i);
               
                return formData;
            },
            datatype: 'json'
        });
        return response;
    };


});
