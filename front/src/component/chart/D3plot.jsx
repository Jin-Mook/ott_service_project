import React, { useEffect } from "react";
import * as d3 from "d3";

import "./D3plot.css";
import pca from "./pca_with_id.csv";

const D3plot = () => {
    useEffect(() => {
        d3.csv(pca, function (data) {
            // console.log(data)
            makeVis(data);
        });

        var makeVis = function (data) {
            // Common pattern for defining vis size and margins
            var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 800 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

            // Add the visualization svg canvas to the vis-container <div>
            var canvas = d3
                .select("#vis-container")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr(
                    "transform",
                    "translate(" + margin.left + "," + margin.top + ")"
                );

            // Define our scales
            //var colorScale = d3.scale.category10();
            var colorScale = function (cluster) {
                if (cluster == 0) {
                    return "#da77f2";
                } else if (cluster == 1) {
                    return "#9775fa";
                } else if (cluster == 2) {
                    return "#748ffc";
                } else if (cluster == 3) {
                    return "#4dabf7";
                }
            };

            var xScale = d3.scale
                .linear()
                .domain([
                    d3.min(data, function (d) {
                        return d.x;
                    }) - 1,
                    d3.max(data, function (d) {
                        return d.x;
                    }) + 1,
                ])
                .range([0, width]);

            var yScale = d3.scale
                .linear()
                .domain([
                    d3.min(data, function (d) {
                        return d.y;
                    }) - 1,
                    d3.max(data, function (d) {
                        return d.y;
                    }) + 1,
                ])
                .range([height, 0]); // flip order because y-axis origin is upper LEFT

            // Define our axes
            var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

            var yAxis = d3.svg.axis().scale(yScale).orient("left");

            // Add x-axis to the canvas
            canvas
                .append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the canvas
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width) // x-offset from the xAxis, move label all the way to the right
                .attr("y", -6) // y-offset from the xAxis, moves text UPWARD!
                .style("text-anchor", "end") // right-justify text
                .text("X")
                .style("fill", "#adb5bd");

            // Add y-axis to the canvas
            canvas
                .append("g")
                .attr("class", "y axis") // .orient('left') took care of axis positioning for us
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)") // although axis is rotated, text is not
                .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
                .style("text-anchor", "end")
                .text("Y")
                .style("fill", "#adb5bd");

            // Add the tooltip container to the vis container
            // it's invisible and its position/contents are defined during mouseover
            var tooltip = d3
                .select("#vis-container")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // tooltip mouseover event handler
            var tipMouseover = function (d) {
                var color = colorScale(d.cluster);
                var html =
                    "<span style='color:" +
                    color +
                    ";'>" +
                    d.title +
                    "</span><br/>";

                tooltip
                    .html(html)
                    .style("left", d3.event.pageX + 15 + "px")
                    .style("top", d3.event.pageY - 28 + "px")
                    .transition()
                    .duration(200) // ms
                    .style("opacity", 0.9); // started as 0!
            };
            // tooltip mouseout event handler
            var tipMouseout = function (d) {
                tooltip
                    .transition()
                    .duration(300) // ms
                    .style("opacity", 0); // don't care about position!
            };

            // Add data points!
            canvas
                .selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", 5.5) // radius size, could map to another data dimension
                .attr("cx", function (d) {
                    return xScale(d.x);
                }) // x position
                .attr("cy", function (d) {
                    return yScale(d.y);
                }) // y position
                .style("fill", function (d) {
                    return colorScale(d.cluster);
                })
                .on("mouseover", tipMouseover)
                .on("mouseout", tipMouseout);

            var tipMouseover_one = function () {
                var color = "red";
                var title = "Inception";
                var html =
                    "<span style='color:" +
                    color +
                    ";'>" +
                    title +
                    "</span><br/>";

                tooltip
                    .html(html)
                    .style("left", d3.event.pageX + 15 + "px")
                    .style("top", d3.event.pageY - 28 + "px")
                    .transition()
                    .duration(200) // ms
                    .style("opacity", 0.9); // started as 0!
            };
            // tooltip mouseout event handler
            var tipMouseout_one = function () {
                tooltip
                    .transition()
                    .duration(300) // ms
                    .style("opacity", 0); // don't care about position!
            };

            canvas
                .append("circle")
                .attr("class", "fix")
                .attr("r", 7) // radius size, could map to another data dimension
                .attr("cx", xScale(0.0516076684)) // x position
                .attr("cy", yScale(-0.323690285)) // y position
                .style("fill", "red")
                .on("mouseover", tipMouseover_one)
                .on("mouseout", tipMouseout_one);
        };
    }, []);

    return <div id="vis-container"> abccc </div>;
};
export default D3plot;
