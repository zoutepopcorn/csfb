user = "";
pass = "";
page = "";

var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});

//First step is to open Facebook
casper.start().thenOpen("https://facebook.com", function() {
        console.log("Facebook website opened");
});

//Now we have to populate username and password, and submit the form
casper.then(function(){
    console.log("Login using username and password");
    this.evaluate(function(){
        document.getElementById("email").value=user;
    		document.getElementById("pass").value=pass;
    		document.getElementById("loginbutton").children[0].click();
    });
});

casper.waitForSelector("#facebook", function() {
    this.capture('asssl.png');
});


var images = [];

casper.GetImages = function() {
    images = this.evaluate(function() {
        var scripts = document.querySelectorAll('img[src]');
            return Array.prototype.map.call(scripts, function (e) {
                return e.getAttribute('src');
        });
    });
    this.echo('** Successfully got the images... **');
    return true;
};


casper.thenOpen(page, function() {
    for(var i = 0; i < 40; i++) {
        this.wait(350, function() {
            this.scrollToBottom();
        });
    }

});

casper.then(function(){
  	var images = this.evaluate(function(){
      	var facebookImages = document.getElementsByTagName('img');
      	var allSrc = [];
        console.log("lengte: " + facebookImages.length);
    		for(var i = 0; i < facebookImages.length; i++) {
    			if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
    				allSrc.push(facebookImages[i].src);
            console.log(facebookImages[i].src);
    		}
    		return allSrc;
  	});
    console.log("aantal images: " + images.length);
    for(i = 0; i < images.length; i++) {
        console.log(images[i]);
    }
    console.log("aantal images: " + images.length);

})

casper.run();
