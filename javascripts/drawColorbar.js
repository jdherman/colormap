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

  for(var color = 0; color < numColors; color++) {

      hexcolor = Raphael.rgb(RIV[color], GIV[color], BIV[color]);

      colorRects[color] = rcbar.rect(color*cbarW/numColors, 0, cbarW/numColors, cbarH)
      .attr({fill: hexcolor, "stroke-width": 0});
  }

  return colorRects;

};
