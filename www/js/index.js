import $ from "jquery";

import * as viz from "./visualizations";

const targetDivId = "container";
const targetDiv = document.createElement("div");
$(targetDiv)
    .attr("id", targetDivId)
    .html("hello")
    .appendTo(document.body);

viz.renderChart("myChart");
viz.renderTo(targetDivId);
if (window.addEventListener) window.addEventListener("load", new lexaudio.example(), false);
else if (window.attachEvent) window.attachEvent("onload", setup(new lexaudio.example()));
else window.onload = new lexaudio.example();
