import $ from "jquery";
import Chart from "chart.js";

export function renderAll(data){
    $("#cardContainer").html("")

    data.visualizations.forEach(function(visualization){
        renderCard(visualization)
    })
}

export function renderTo(target) {
    $.get("/api/visualizations")
    .done(function(res) {
        $("#" + target).html("Request response: " + JSON.stringify(res));
    })
    .fail(function(err) {
        console.log("error: ", err);
    });
};

export function renderChart(target, visualization) {
    var canvas = $("<canvas>");

    var context = canvas.get(0).getContext("2d");
    var myChart = new Chart(context, {
        type: visualization.type,
        data: visualization.data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    canvas
        .attr("id", visualization.id)
        .appendTo($("." + target))
}

export function renderCard(visualization){
    var cardContainer = $("#cardContainer")

    var portletTools3 = $("<div>");
    portletTools3
        .attr("class", "m-portlet m-portlet--head-sm")
        .attr("id", "m_portlet_tools_3");

    cardContainer.append(portletTools3);

    var portletHead = $("<div>");
    portletHead.attr("class", "m-portlet__head");
    portletTools3.append(portletHead);

    var mPortletHeadCaption = $("<div>");
    mPortletHeadCaption.attr("class", "m-portlet__head-caption");
    portletHead.append(mPortletHeadCaption);

    var mPortletHeadTitle = $("<div>");
    mPortletHeadTitle.attr("class", "m-portlet__head-title");
    mPortletHeadCaption.append(mPortletHeadTitle);

    var mPortletHeadIcon = $("<span>");
    mPortletHeadIcon.attr("class", "m-portlet__head-icon");
    mPortletHeadTitle.append(mPortletHeadIcon);

    var mPortletHeadText = $("<h3>")
    mPortletHeadText.attr("class", "m-portlet__head-text").html("Chart")
    mPortletHeadIcon.append(mPortletHeadText);

    var mPortletHeadTools = $("<div>");
    mPortletHeadTools.attr("class", "m-portlet__head-tools");
    portletHead.append(mPortletHeadTools)

    var mPortletBody = $("<div>")
    mPortletBody.attr("class", "m-portlet__body");
    portletTools3.append(mPortletBody);

    var visualizationContainer = $("<div>")
    visualizationContainer.attr("class", "visualizationContainer");
    mPortletBody.append(visualizationContainer);

    renderChart("visualizationContainer", visualization);

//     <div class="m-portlet m-portlet--head-sm" id="m_portlet_tools_3">
//     <div class="m-portlet__head">
//         <div class="m-portlet__head-tools">
//             <ul class="m-portlet__nav">
//                 <li class="m-portlet__nav-item">
//                     <a href="#" data-portlet-tool="reload" class="m-portlet__nav-link m-portlet__nav-link--icon" title="" data-original-title="Reload">
//                         <i class="la la-refresh"></i>
//                     </a>
//                 </li>
//                 <li class="m-portlet__nav-item">
//                     <a href="#" data-portlet-tool="toggle" class="m-portlet__nav-link m-portlet__nav-link--icon" title="" data-original-title="Collapse">
//                         <i class="la la-angle-down"></i>
//                     </a>
//                 </li>
//                 <li class="m-portlet__nav-item">
//                     <a href="#" data-portlet-tool="fullscreen" class="m-portlet__nav-link m-portlet__nav-link--icon" title="" data-original-title="Fullscreen">
//                         <i class="la la-expand"></i>
//                     </a>
//                 </li>
//                 <li class="m-portlet__nav-item">
//                     <a href="#" data-portlet-tool="remove" class="m-portlet__nav-link m-portlet__nav-link--icon" title="" data-original-title="Remove">
//                         <i class="la la-close"></i>
//                     </a>
//                 </li>
//             </ul>
//         </div>
//     </div>
//     <div class="m-portlet__body">
//         <div class="m-scrollable" data-scrollbar-shown="true" data-scrollable="true" data-max-height="300" style="overflow: auto; height: 300px; max-height: 300px;">
//             <div class="visualizationContainer"></div>
//             <div class="m-separator m-separator--space m-separator--dashed"></div>
//         </div>
//     </div>
// </div>

}

export function deleteChartById(){
    $("#1").remove();
}