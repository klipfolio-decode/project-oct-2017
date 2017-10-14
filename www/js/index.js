import $ from "jquery";

import * as viz from "./visualizations";
import * as firebase from "firebase";
import config from "../../config.json";

// Initialize Firebase
firebase.initializeApp(config.firebase);

var database = firebase.database();
var nameRef = database.ref().child('data');

nameRef.on('value', snap => {
  viz.renderAll(snap.val())
});

function render(){
	viz.renderChart("visualizationContainer", mockData.visualizations[0]);
}

/*
const addChartButton = document.createElement("button")
$(addChartButton)
	.attr("id", "button1")
	.html("Add Chart")
	.appendTo(document.body)
	.click(render);

	*/

if (window.addEventListener) window.addEventListener("load", new lexaudio.example(), false);
else if (window.attachEvent) window.attachEvent("onload", setup(new lexaudio.example()));
else window.onload = new lexaudio.example();