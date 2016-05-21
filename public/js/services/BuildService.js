Constructable.service('BuildService', function(HexService){
    function ConstructableObj() {
        this.id = HexService.get();
        this.alignment = "left";
        this.color = "black";
        this.fontFamily = "inherit";
        this.fontSize = 'inital';
        this.width = '100%';
        this.place ="left";
        this.style = "{'font-family':document[$index].fontFamily,'font-size':document[$index].fontSize,'text-align':document[$index].alignment,'color':document[$index].color,'width':document[$index].width, 'float':document[$index].place}";
    }

    function Title() {
        that = new ConstructableObj();
        that.type = "Title";
        that.markup = {
            input:"",
            display: '<h1 class="preview-item" ng-style="{{document[$index].style}}">{{document[$index].markup.input}}</h1>',
            wrap: '<input ng-model="document[$index].markup.input"></input>'
        };
        return that;
    }

    function Subtitle() {
        that = new ConstructableObj();
        that.type = "Subtitle";
        that.markup = {
            input:"",
            display: '<h2 class="preview-item" ng-style="{{document[$index].style}}">{{document[$index].markup.input}}</h2>',
            wrap: '<input ng-model="document[$index].markup.input"></input>'
        };
        return that;
    }

    function Paragraph() {
        that = new ConstructableObj();
        that.type = "Paragraph";
        that.markup = {
            input:"",
            display: '<pre class="preview-item paragraph" ng-style="{{document[$index].style}}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{document[$index].markup.input}}</pre>',
            wrap: '<textarea ng-model="document[$index].markup.input"></textarea>'
        };
        return that;
    }

    function Image() {
        that = new ConstructableObj();
        that.type = "Image";
        that.markup = {
            input:"",
            display: '<div ng-style="{{document[$index].style}}"><img class="preview-item" src="{{document[$index].markup.input}}"></img></div>',
            wrap: '&nbsp;&nbsp;&nbsp;&nbsp;<label>image url:</label><input ng-model="document[$index].markup.input"></input>'
        };
        return that;
    }

    function Link() {
        that = new ConstructableObj();
        that.type = "Link";
        that.markup = {
            input: {
                link_url: "",
                link_as: ""
            },
            display: '<div ng-style="{{document[$index].style}}"><a target="_blank" class="preview-item" ng-href="{{document[$index].markup.input.link_url}}">{{document[$index].markup.input.link_as ? document[$index].markup.input.link_as : document[$index].markup.input.link_url}}</a></div>',
            wrap: '&nbsp;&nbsp;&nbsp;&nbsp;<label>link url:</label><br>&nbsp;&nbsp;&nbsp;&nbsp;<input ng-model="document[$index].markup.input.link_url"></input><br>&nbsp;&nbsp;&nbsp;&nbsp;<label>link label:</label><br>&nbsp;&nbsp;&nbsp;&nbsp;<input ng-model="document[$index].markup.input.link_as" placeholder="optional"></input>'
        };
        return that;
    }

    function Code() {
        that = new ConstructableObj();
        that.type = "Code";
        that.markup = {
            input:"",
            display: '<pre class="preview-item code" ng-style="{{document[$index].style}}">{{document[$index].markup.input}}</pre>',
            wrap: '<textarea ng-model="document[$index].markup.input"></textarea>'
        };
        return that;
    }

    function Break() {
        that = new ConstructableObj();
        that.type = "Break";
        that.markup = {
            input:"",
            display: '<br><br>',
            wrap: '<p>Line Break</p>'
        };
        return that;
    }

    function List() {
        that = new ConstructableObj();
        that.type = "List";
        that.markup = {
            input:"",
            display: '<ul><li ng-style="{{document[$index].style}}">{{document[$index].markup.input}}</li></ul>',
            wrap: '<input ng-model="document[$index].markup.input"></input>'
        };
        return that;
    }

    return {
        title: Title,
        subtitle: Subtitle,
        paragraph: Paragraph,
        image: Image,
        link: Link,
        code: Code,
        break: Break,
        list: List
    }
});