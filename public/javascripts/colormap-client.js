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

    for (i = 0; i < numButtons; i++) {
        
        startX = 10 + (W - 60) / (numButtons - 1) * i;
        startY = H - 10 - (H - 20) / 100 * 50;
        
        this.buttons.push(r.circle(startX, startY, 5).attr({fill: color, stroke: "none"}));
        var parent = this;

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
        });

        this.buttons.items[i].node.style.cursor = "move";
    }
    
    this.drawPath();

    return this;
};