angulike
========

AngularJS directives for social sharing buttons - Facebook Like, Google+, Twitter and Pinterest 

###Demo

To see a demo and further details go to http://jasonwatmore.com/post/2014/08/01/AngularJS-directives-for-social-sharing-buttons-Facebook-Like-GooglePlus-Twitter-and-Pinterest.aspx

###Installation

Install using bower: `bower install angulike`

Alternatively download the code and include the angulike.js file in your page.

Add the 'angulike' directive as a dependency of your AngularJS application:

```javascript
angular.module('myApp', ['angulike']);
```

###Usage

####Facebook Like

Create an empty div with the *fb-like* attribute.

```html
<div fb-like></div>
```

Optionally you can set the URL for the facebook like button to link to like this:

```html
<div fb-like="myModel.FbLikeUrl"></div>
```

####Google+

Create an empty div with the *google-plus* attribute.

```html
<div google-plus></div>
```

####Twitter

Create an empty div with the *tweet* attribute, the value of the attribute contains the name of the model object for the tweet text.

```html
<div tweet="myModel.Name"></div>
```

####Pinterest

Create an empty div with the *pin-it* and *pin-it-image* attributes, the pin-it attribute contains the name of the model object for the 
description and the pin-it-image attribute contains the name of the model object for the image url:

```html
<div pin-it="myModel.Name" pin-it-image="myModel.ImageUrl"></div>
```

