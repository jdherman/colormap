var colormapPlot = function () {
    
    // Configure and create Raphael object
    var W = 500,
        H = 350,
        r = Raphael("raph-holder", W, H);

    var len = 5;
        
    function drawPath() {
        var p = "M";
        for (var i = 0; i < len; i++) {
            if(i > 0) p += "L";
            p = p + [buttons.items[i].attr('cx'), buttons.items[i].attr('cy')];
        }
        path.attr({path: p});
        console.log(p);
    }
    
    var color = "hsb(240°, 1, 1)",
        buttons = r.set(),
        path = r.path().attr({stroke: color, "stroke-width": 2});

    for (i = 0; i < len; i++) {
        
        startX = 10 + (W - 60) / (len - 1) * i;
        startY = H - 10 - (H - 20) / 100 * 50;
        
        buttons.push(r.circle(startX, startY, 5).attr({fill: color, stroke: "none"}));

        buttons.items[i].mouseover(function () {
            this.animate({r: 10}, 200);
            this.node.style.cursor = "move";

        }).mouseout(function () {
            this.animate({r: 5}, 200);
            this.node.style.cursor = "default";

        }).drag(function (dx, dy) {

            tempY = this.attr("cy") + dy - (this.dy || 0);
            
            // if tempY > H - 10 ... or something
            drawPath();
            this.attr({cy: tempY});
            
            this.dx = dx;
            this.dy = dy;   
            r.safari();

        }, function () {
            this.dx = this.dy = 0;
        });
    }
    
    drawPath();

};
