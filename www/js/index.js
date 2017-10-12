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
