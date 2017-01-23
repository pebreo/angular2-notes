Overview
-----

source: https://github.com/jakerella/jquery-mockjax


Example
--------
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mockjax/1.6.2/jquery.mockjax.min.js"></script>

<p align="center"><button onclick="sayHelloFake();" >Test Fack Ajax Request</button></p>
<div id="output_fake" class="output"></div>
```
```javascript

mockdata = {
    "employees": [{
        "firstName": "Vikas",
        "lastName": "Bhagwagar"
    }, {
        "firstName": "Gaurav",
        "lastName": "Patel"
    }, {
        "firstName": "Ankur",
        "lastName": "Shah"
    }]
};

$.mockjax({
    url: "hello.php",
    response: JSON.Stringify(mockdata),
    responseTime: 0,
    dataType: 'json'
});
 
$.ajax({
    url: "hello.php",
    dataType: 'json'
 
}).done(function (json_response) {
 
    var names = [];
    for (i in json_response.employees) {
        names.push(json_response.employees[i].firstName);
    }
    output = names.join("<br/>");
    $('#output_fake_json').html(output);
 
    $.mockjaxClear();
});

# sample.json
{
    "employees": [{
        "firstName": "Vikas",
        "lastName": "Bhagwagar"
    }, {
        "firstName": "Gaurav",
        "lastName": "Patel"
    }, {
        "firstName": "Ankur",
        "lastName": "Shah"
    }]
}

```