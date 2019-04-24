var enlargeSVG = d3.select("#dataContainer")
    .append("svg")
    .attr("class", "svg-container")
    .append("g")

enlargeSVG.append("g")
    .attr("class", "slices");
enlargeSVG.append("g")
    .attr("class", "labels");
enlargeSVG.append("g")
    .attr("class", "lines");

var width = 360,
    height = 250,
    radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    });

var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

enlargeSVG.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
enlargeSVG.attr("preserveAspectRatio", "xMinYMin meet");
enlargeSVG.attr("viewBox", "0 0 360 250");

enlargeSVG.append("text")
   .attr("text-anchor", "middle")
   .attr("font-size","13px")
   .text("Enlarge");

var key = function(d){ return d.data.label; };

var color = d3.scale.ordinal()
    .domain(["Active", "Pause"])
    .range(["#98abc5", "#8a89a6"]);

function dataForEnlarge(enlargeActive, enlargePause){
    var labels = color.domain();
    for (var i = 0; i < labels.length; i++) {
        if (i == 0) {
            labels[i] = { label: labels[i].label ? labels[i].label : labels[i], value: enlargeActive }
        }
        else {
            labels[i] = { label: labels[i].label ? labels[i].label : labels[i], value: enlargePause }
        }
    };
    return labels;
}


function changeEnlarge(data) {

    /* ------- PIE SLICES -------*/
    var slice = enlargeSVG.select(".slices").selectAll("path.slice")
        .data(pie(data), key);

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
        .attr("class", "slice");

    slice		
        .transition().duration(1000)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })

    slice.exit()
        .remove();

    /* ------- TEXT LABELS -------*/

    var text = enlargeSVG.select(".labels").selectAll("text")
        .data(pie(data), key);

    text.enter()
        .append("text")
        .attr("font-size","12px")
        .attr("dy", ".35em")
        .text(function(d) {
            return d.data.label;
        });
    
    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text.transition().duration(1000)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
            };
        })
        .styleTween("text-anchor", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start":"end";
            };
        });

    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = enlargeSVG.select(".lines").selectAll("polyline")
        .data(pie(data), key);
    
    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween("points", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };			
        });
    
    polyline.exit()
        .remove();
};