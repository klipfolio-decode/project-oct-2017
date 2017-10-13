import $ from "jquery";

import * as viz from "./visualizations";
import * as firebase from "firebase";
import config from "../../config.json";

// Initialize Firebase
firebase.initializeApp(config.firebase);

var database = firebase.database();
var nameRef = database.ref().child('data');

// nameRef.on('value', snap => document.getElementById('data').innerText = snap.val());

nameRef.on('value', snap => {
  viz.renderAll(snap.val())
});

var mockData = {
    visualizations: [
        {
            id: '1',
            type: 'line',
            label: 'name',
            data:{
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'],
                    borderColor: [
                        'rgba(255,99,132,1)'],
                    borderWidth: 1
                },{
                    label: '# of Whatever;',
                    data: [11, 18, 2, 4, 1, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'],
                    borderColor: [
                        'rgba(255,99,132,1)'],
                    borderWidth: 1
                }]
            }
        },
        {
            id: '2',
            type: 'line',
            label: 'name2',
            data:{
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [5, 12, 10, 1, 26, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'],
                    borderColor: [
                        'rgba(255,99,132,1)'],
                    borderWidth: 1
                },{
                    label: '# of Whatever;',
                    data: [11, 18, 2, 4, 1, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'],
                    borderColor: [
                        'rgba(255,99,132,1)'],
                    borderWidth: 1
                }]
            }
        }
    ],};

function render(){
	viz.renderChart("visualizationContainer", mockData.visualizations[0]);
}

const addChartButton = document.createElement("button")
$(addChartButton)
	.attr("id", "button1")
	.html("Add Chart")
	.appendTo(document.body)
	.click(render);