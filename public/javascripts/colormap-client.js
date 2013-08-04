var colormapPlot = function () {
    
    // Configure and create Raphael object
    var W = 500,
        H = 350,
        r = Raphael("raph-holder", W, H);

    // values contains the points. len is the number of points. start at 50.
    var values = [],
        len = 5;
    for (var i = len; i--;) {
        values.push(50);
    }
    
    // Convert pixel values to values within the Raphael object (?)
    function translate(x, y) {
        return [
            10 + (W - 60) / (values.length - 1) * x,
            H - 10 - (H - 20) / 100 * y
        ];
    }
    
    function drawPath() {
        var p = [];
        for (var j = 1, jj = X.length; j < jj; j++) {
            p.push(X[j], Y[j]);
        }
        p = ["M", X[0], Y[0], "L"].concat(p);
        path.attr({path: p});
    }
    
    var color = "hsb(240°, 1, 1)",
        X = [],
        Y = [],
        buttons = r.set(),
        w = (W - 60) / values.length,
        isDrag = -1,
        start = null,
        path = r.path().attr({stroke: color, "stroke-width": 2}),
        unhighlight = function () {};
    
    var ii = values.length - 1;
    for (i = 0; i < values.length; i++) {
        
        var xy = translate(i, values[i]);
        
        X[i] = xy[0];
        Y[i] = xy[1];
        
        (f = function (i, xy) {
            buttons.push(r.circle(xy[0], xy[1], 5).attr({fill: color, stroke: "none"}).mouseover(function () {
                if (isDrag + 1) {
                    unhighlight = function () {};
                } else {
                    buttons.items[i].animate({r: 10}, 200);
                }
            }).mouseout(function () {
                if (isDrag + 1) {
                    unhighlight = function () {
                        buttons.items[i].animate({r: 5}, 200);
                    };
                } else {
                    buttons.items[i].animate({r: 5}, 200);
                }
            }).drag(function (dx, dy) {
                var start = this.start;
                start && update(start.i, start.p + dy);
            }, function (x, y) {
                this.start = {i: i, m: y, p: Y[i]};
            }));

            buttons.items[buttons.items.length - 1].node.style.cursor = "move";

        })(i, xy);
    }

    
    drawPath();
    var update = function (i, d) {
        (d > H - 10) && (d = H - 10);
        (d < 10) && (d = 10);
        Y[i] = d;
        drawPath();
        buttons.items[i].attr({cy: d});
        r.safari();
    };
};
