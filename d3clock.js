
;(function() {

    var fields = function() {
        var currentTime, hour, minute, second;
        currentTime = new Date();
        second = currentTime.getSeconds();
        minute = currentTime.getMinutes();
        hour = currentTime.getHours() + minute / 60;
        return data = [{
            "unit": "seconds",
            "numeric": second
        }, {
            "unit": "minutes",
            "numeric": minute
        }, {
            "unit": "hours",
            "numeric": hour
        }];
    };

    var width = 300;
    var height = 300;
    var offSetX = width/2;
    var offSetY = height/2;
    var thisObj = this;

    var pi = Math.PI;
    var scaleSecs = d3.scale.linear()
        .domain([0, 59 + 99 / 1000])
        .range([0, 2 * pi]);
    var scaleMins = d3.scale.linear()
        .domain([0, 59 + 59 / 60])
        .range([0, 2 * pi]);
    var scaleHours = d3.scale.linear()
        .domain([0, 11 + 59 / 60])
        .range([0, 2 * pi])

    var vis = d3.selectAll(".chart")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)

    var clockGroup = vis.append("svg:g")
        .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

    clockGroup.append("svg:circle")
        .attr("r", Math.min(width, height) / 2 - 30).attr("fill", "none")
        .attr("class", "clock outercircle")
        .attr("stroke", "#ecf0f1")
        .attr("fill", "#e74c3c")
        .attr("stroke-width", 2);


    clockGroup.append("svg:circle")
        .attr("r", 4)
        .attr("fill", "#ecf0f1")
        .attr("class", "clock innercircle")


    var r = Math.min(width, height) / 2 - 50;

    tickLabelGroup = vis.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")");
        tickLabelGroup.selectAll("text.label")
            .data(d3.range(12))
            .enter().append("svg:text")
            .attr("class", "label")
            .attr("font-size", 14)
            .attr("font-family", "微软雅黑")
            .attr("x", function(d, i) {
                return (r+5) * Math.cos(2 * i * 0.26 - 1.57)
            })
            .attr("y", function(d, i) {
                return 7 + (r+5) * Math.sin(2 * i * 0.26 - 1.57)
            })
            .attr("fill", "#fff")
            .attr("text-anchor", "middle")
            .text(function(d, i) {
                if (d == 0)
                    return 12;
                else return d;
            });


    var render = function(data) {
        var hourArc, minuteArc, secondArc;

        clockGroup.selectAll(".clockhand").remove();

        secondArc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(function(d) {
                return scaleSecs(d.numeric);
            })
            .endAngle(function(d) {
                return scaleSecs(d.numeric);
            });

        minuteArc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(function(d) {
                return scaleMins(d.numeric);
            })
            .endAngle(function(d) {
                return scaleMins(d.numeric);
            });

        hourArc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r-8)
            .startAngle(function(d) {
                return scaleHours(d.numeric);
            })
            .endAngle(function(d) {
                return scaleHours(d.numeric);
            });

        clockGroup.selectAll(".clockhand")
            .data(data)
            .enter()
            .append("svg:path")
            .attr("d", function(d) {
                if (d.unit === "seconds") {
                    return secondArc(d);
                } else if (d.unit === "minutes") {
                    return minuteArc(d);
                } else if (d.unit === "hours") {
                    return hourArc(d)
                }
            })
            .attr("class", "clockhand")
            .attr("stroke", "#ecf0f1")
            .attr("stroke-width", function(d) {
                if (d.unit === "seconds") {
                    return 2
                } else if (d.unit === "minutes" || d.unit === "hours") {
                    return 3
                }
            })
            .attr("fill", "none");
    };

    setInterval(function() {
        var data;
        data = fields();
        return render(data);
    }, 1000);

}).call(this)
