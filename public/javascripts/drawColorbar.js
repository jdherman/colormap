var initColorbar = function(r, rcbar, numColors, cmapLines) {

  var cbarH = rcbar.height;
  var cbarW = rcbar.width;

  Red = cmapLines[0];
  Green = cmapLines[1];
  Blue = cmapLines[2];

  RIV = Red.getIntensityValues(numColors);
  GIV = Green.getIntensityValues(numColors);
  BIV = Blue.getIntensityValues(numColors);

  colorRects = [];

  for(var color = 0; color <= numColors; color++) {

      hexcolor = Raphael.rgb(RIV[color], GIV[color], BIV[color]);

      colorRects[color] = rcbar.rect(0, cbarH-(color+1)*cbarH/numColors, cbarW, cbarH/numColors)
      .attr({fill: hexcolor, "stroke-width": 0});
  }

  return colorRects;

};
