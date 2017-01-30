

Interactions cheatsheet
----------------------
```
ic -> jquery
<button id="bar" ic-action="myevent"></button>    #  run the custom event myevent when button is clicked
$(document).on("myevent", function(){}) 


ic -> src (GET request)
<div id="bar" ic-trigger-on="scrolled-into-view" ic-src="/prompts">   # run a GET on /prompts when the dom event scrolled-into-view runs

jquery -> ic
# this jquery will call div.foo
$(document).trigger('myevent')  # call the created event myevent
<div id="foo" ic-post-to="/something" ic-trigger-on="myevent"> # create an event


ic -> dom (POST)
<div ic-post-to="/posts" name="myvalue"  ic-target="mydiv"   ic-replace-target="true"> # replace entire html of target instead of Inner
# this works with mockjax
# ic-replace-target is optional - default is false

ic -> dom (GET)
<ic-get-from="/prompts"    ic-target="mydiv"     ic-trigger-on="load" ic-replace-target="true">
# this doesn't work with mockjax for some reason
# but you can use this when you click on a button

ic -> dom (DELETE)
<ic-delete-from="/prompts" name="targetId">
you must return response with header
X-IC-Remove = true  

ic -> dom (repeated/polling)
ic-poll="2s"  ic-trigger-on="myevent"

remote -> ic
return with response header X-IC-Trigger = "myevent"
$(document).on('myevent', function(){})
```




----

ic-get-from

ic-post-to

ic-action = trigger a function
http://intercoolerjs.org/attributes/ic-action.html

<ic-post-to="/foo" ic-trigger-on="onload">

// run when these ic events fire
$(document).bind('success.ic', function(){
    console.log('ic fired'); 
});

// use in place of jQuery
// use this to add logic in your ic generated html 
Intercooler.ready(function(elt){
   console.log('intercooler is ready'); 

});

ic-global-include

ic-include


ic-target

ic-deps 