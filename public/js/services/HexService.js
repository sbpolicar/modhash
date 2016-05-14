Constructable.service('HexService', [function(){
    var getHex = function() {
        var length = 16;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var hex = '';
        for (var i = length; i > 0; --i) hex += chars[Math.round(Math.random() * (chars.length - 1))];
        return hex;
    }
    return {
        get: getHex
    }
}]);