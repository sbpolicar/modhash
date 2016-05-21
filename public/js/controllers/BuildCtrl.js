Constructable.controller('BuildCtrl',
    function($scope, $http, $httpParamSerializerJQLike, $timeout, $sce, HexService, BuildService){

    displayMessage = function(message, color) {
        $scope.message = message;
        $scope.flash = color;
        $timeout(function(){
            $scope.message = '';
        }, 4000);
    }

    var updateDocument = function(){
        window.localStorage.myDocument = JSON.stringify($scope.document);
    }


    // if localStorage as a previous document, load it
    if(window.localStorage.myDocument !== undefined) {
        loadDocument = JSON.parse(window.localStorage.myDocument);
        // loadDocument = [];
    } else {
        loadDocument = [];
    }

    // $scope variables
    $scope.document = loadDocument || [];
    $scope.name = {
        documentTitle: ''
    }

    // $scope functions
    //
    // opens side-nav to enable user to build document using $scope.addInput();
    $scope.selectInputType = function(boolean) {
        $scope.toggleSelectInput = boolean;
    }

    var runSave = function(name, fullDocument){
        $http({
            method: 'POST',
            url: '/save',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            data: $httpParamSerializerJQLike({
                "documentName": name.documentTitle,
                "documentArray": JSON.stringify(fullDocument),
                "documentSecret": HexService.get()
            })
        })
        .then(function(success){
            displayMessage("Saved!", 'green');
            console.log('success', success);
        },
        function(error){
            displayMessage("Error, not saved.");
            console.log('error', error);
        })
    }

    // saves document to database
    $scope.saveDocument = function(){
        console.log('clicked');
        if($scope.name.documentTitle === ''){
            displayMessage('You need to name your document.', 'red');
        } else {
            if($scope.document[0]) {
                console.log('content exsists, sending form data to server');
                runSave($scope.name, $scope.document);
            }
        }
    }

    // clear all document inputs and text but keep inputs intact
    $scope.clearDocument = function(){
        $scope.document.forEach(function(item){
            if(item.type != 'Link') {
                item.markup.input = '';
            } else {
                item.markup.input.link_as = '';
                item.markup.input.link_url = '';
            }
        })
        displayMessage('Cleared.', 'blue');
    }

    // delete all text and inputs
    $scope.deleteDocument = function(){
        if($scope.name.documentTitle != '') {
            title = $scope.name.documentTitle;
        } else {
            title = 'blank'
        }
        $scope.name.documentTitle = '';
        $scope.document = [];
        window.localStorage.removeItem('myDocument');
        displayMessage(title+" was deleted.", 'green')
    }

    // switch alignment of item @ index
    $scope.setAlignment = function(alignTo, index) {
        // console.log('align item = ',$scope.document[index])
        $scope.document[index].alignment = alignTo;
        updateDocument();
    }

    $scope.$watchCollection('document', function(updated){
        // var parsed = ParseDocument.parse(updated);
        // console.log('parsed ---- ', JSON.stringify(parsed));
        console.log('document ---- ',JSON.stringify($scope.document));
        updateDocument();
    })

    $scope.addInput = function(inputType){
        // lets user set multiple inputs at once in stead of one at a time
        // $scope.toggleSelectInput = !$scope.toggleSelectInput;
        switch (inputType) {
            case 'title':
                $scope.document.push( new BuildService.title() )
                break;
            case 'subtitle':
                $scope.document.push( new BuildService.subtitle() )
                break;
            case 'paragraph':
                $scope.document.push( new BuildService.paragraph() )
                break;
            case 'image':
                $scope.document.push( new BuildService.image() )
                break;
            case 'link':
                $scope.document.push( new BuildService.link() )
                break;
            case 'code':
                $scope.document.push( new BuildService.code() )
                break;
            case 'break':
                $scope.document.push( new BuildService.break() )
                break;
            case 'list':
                $scope.document.push( new BuildService.list() )
                break;
        }
    }

    window.onbeforeunload = function() {
        if($scope.document.length >= 1) {
            updateDocument();
        }
    };

    window.onunload = function() {
        window.scrollTo(0,0);
    };
})