"use strict";

function gradeObject(){
    this.array      = [new Array(12),new Array(11),new Array(4)];
    this.count      = 0;
    this.crossed    = [];
}
let grades = new gradeObject();

    // calculate the average
// function calculate(){
//     let all = 0;
//     for (let i = 0; i < grades.length; i++) {
//         const array = grades[i];
//         for (let j = 0; j < array.length; j++) { 

//             if(array[j] != undefined){
//                 let element = array[j][0];
// //                 APs have to be counted twice
//                 if(i == 2){
//                     element *= 2;
//                 }
//                 all += element;
//             }
//         }
//     }
//     let erg = 17/3-5*all/390;
//     console.log(erg,all);
//     document.getElementById("erg").innerText ="Notendurchschnitt: "+ (erg).toFixed(2);
// }
// function checkCrossing(){
//     let allhy = grades[0].concat(grades[1]);
//     allhy.sort(function(a,b) {
//         return a[0]-b[0]
//     });

//     grade_crossed.forEach(element => {
//         const id = (element[1] + ";" + element[2]).toString();
//         document.getElementById(id).className = undefined;

//     });

//     for (let i = 0; i < 4; i++) {
//         const element = allhy[i];
//         grade_crossed[i] = element; 
//         const id = (element[1] + ";" + element[2]).toString();
//         const node = document.getElementById(id);
//         node.className = "warning";
        
//     }

// }