var colormapLine = function (r, numButtons, color) {
    
    var W = r.width,
        H = r.height;
        
    this.drawPath = function() {
        var p = "M";
        for (var i = 0; i < numButtons; i++) {
            if(i > 0) p += "L";
            p = p + [this.buttons.items[i].attr('cx'), this.buttons.items[i].attr('cy')];
        }
        this.path.attr({path: p});
    }
    
    this.buttons = r.set(),
    this.path = r.path().attr({stroke: color, "stroke-width": 2});
    var isDragging = false;

    for (i = 0; i < numButtons; i++) {
        
        startX = 10 + (W-20) / (numButtons - 1) * i;
        startY = H - 10 - (H - 20) / 100 * (100/(i+1));
        
        this.buttons.push(r.circle(startX, startY, 5).attr({fill: color, stroke: "none"}));
        var parent = this;

        this.buttons.items[i].mouseover(function() {
            if(!isDragging) {
                this.animate({r: 10}, 200);
            }
        }).mouseout(function() {
            if(!isDragging) {
                this.animate({r: 5}, 200);
            }
        });

        this.buttons.items[i].drag(function (dx, dy) { // "move" function

            tempY = this.attr("cy") + dy - (this.dy || 0);
            if(tempY > H - 10) tempY = H - 10;
            else if (tempY < 10) tempY = 10;

            parent.drawPath();
            this.attr({cy: tempY});
            this.dx = dx;
            this.dy = dy;   
            r.safari();

        }, function () {
            this.dx = this.dy = 0; // "start" function
            isDragging = true;
        }, function() {
            isDragging = false; // "stop" function
            this.animate({r: 5}, 200);
        });

        this.buttons.items[i].node.style.cursor = "move";
    }
    
    this.drawPath();

    this.getIntensityValues = function(numColors) {

        ColorVector = [];

        for(var color = 0; color <= numColors; color++) {

            cx = 10 + (color/numColors)*(440);

            for(var j = 0; j < this.buttons.items.length-1; j++) {

                thisButton = this.buttons.items[j];
                nextButton = this.buttons.items[j+1];
                thisButtonX = thisButton.attr('cx');
                nextButtonX = nextButton.attr('cx');

                // Find the points to interpolate between
                if(cx >= thisButtonX && cx < nextButtonX) {
                    thisButtonY = thisButton.attr('cy');
                    nextButtonY = nextButton.attr('cy');
                    cyInterp = thisButtonY + (cx - thisButtonX)/(nextButtonX - thisButtonX)*(nextButtonY - thisButtonY);

                    if(cyInterp > H - 10) cyInterp = H - 10;
                    else if (cyInterp < 10) cyInterp = 10;

                    ColorVector[color] = 255*(1-(cyInterp-10)/(H-20));
                    j = this.buttons.items.length-1; // shitty way to break inner loop but not outer

                } else continue;
            }
        }

        return ColorVector; // a numColors size vector of RGB values (one of the three)
    }
};