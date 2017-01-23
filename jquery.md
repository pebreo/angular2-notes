Overview
--------

AJAX EXAMPLE
-------------
```javascript
function serialToJson(serializer){
    var _string = '{';
    for(var ix in serializer)
    {
        var row = serializer[ix];
        _string += '"' + row.name + '":"' + row.value + '",';
    }
    var end =_string.length - 1;
    _string = _string.substr(0, end);
    _string += '}';
    //console.log('_string: ', _string);
    //return JSON.parse(_string);
    return _string;
};

$(document).ready(function () {

    $("#submit").on('click',function(){
      
      var vals = $('#form').serializeArray();
      json_data = serialToJson(vals);
      ajx_config = {
        url: "/postform", 
        type: 'POST',
        data: json_data,
        contentType: "application/json; charset=utf-8"           
      };
      ajx_config['error'] = function(err) {
          console.log('Error!', err);
      };
      ajx_config['success'] = function(data) {
          console.log('Success!');
          console.log('the data' + data)
      };
      $.ajax(ajx_config);

    });
    
});
 
```