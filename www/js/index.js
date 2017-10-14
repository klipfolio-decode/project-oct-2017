import $ from "jquery";

import * as viz from "./visualizations";
import * as firebase from "firebase";
import config from "../../config.json";

// Initialize Firebase
firebase.initializeApp(config.firebase);

var database = firebase.database();
var nameRef = database.ref().child('data');

var ids = [];

nameRef.on('value', snap => {
	var updatedIds = []
	var toRender = []
	var toDelete = []
	snap.val().visualizations.forEach(function(visualization){
		updatedIds.push(visualization.id)
    })

    var isSameSet = function( arr1, arr2 ) {
	  return  $( arr1 ).not( arr2 ).length === 0 && $( arr2 ).not( arr1 ).length === 0;  
	}
	
	if(!isSameSet( updatedIds, ids )){
		toRender = $(updatedIds).not(ids).get();
		toDelete = $(ids).not(updatedIds).get();
		ids = updatedIds;

		console.log("R " + toRender);
		console.log("D " + toDelete);
	}

	console.log("IDs " + ids)
	console.log("Updated IDs " + updatedIds)
  	viz.renderAll(snap.val())
});

/*
const addChartButton = document.createElement("button")
$(addChartButton)
	.attr("id", "button1")
	.html("Add Chart")
	.appendTo(document.body);

	*/

if (window.addEventListener) window.addEventListener("load", new lexaudio.example(), false);
else if (window.attachEvent) window.attachEvent("onload", setup(new lexaudio.example()));
else window.onload = new lexaudio.example();
