"use strict";

function gradeObject(){
    this.array      = [new Array(12),new Array(11),new Array(4)];
    this.count      = 0;
    this.crossed    = [];
}
let grades = new gradeObject();

function checkCrossing(){
    let allhy = grades.array[0].concat(grades.array[1]);
    
    allhy.sort(function(a,b) {
        if (a === b) {
                return 0;
        }else if (a === null) {
                return 1;
        }else if (b === null) {
            return -1;
        }else{
            return a[0]-b[0] 
        }   

    });

    if (grades.crossed) {
        grades.crossed.forEach(element => {
            if (element) {
                const id = (element[1] + ";" + element[2]).toString();
            document.getElementById(id).className = undefined;
            grades.crossed = [];
            }
        });
    }

    let crossed = 0;
    let opportunities = grades.count -17;
    let checked_grades = [];
    while(crossed < opportunities){
        
        let element = allhy[crossed];
        const already_crossed = checked_grades.findIndex((el)=> el == element[2]);
        if (already_crossed < 0) {
            
       
        if (element[2]==allhy[crossed+1][2]){

            if (element[0]>allhy[crossed+1][0]) {
                opportunities++;
                crossed++;
            }
        }
        element = allhy[crossed];
        checked_grades[crossed] = element[2];

        grades.crossed[crossed] = element;
        
        const id = (element[1] + ";" + element[2]).toString();
        const node = document.getElementById(id);
        node.className = "warning";
        if (element[2]==allhy[crossed+1][2] && element[0]==allhy[crossed+1][0]) {
            opportunities++;
            crossed++;  
        }
    }else{
        opportunities++;
    }
        crossed++;
    }


}
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


//     for (let i = 0; i < 4; i++) {
//         const element = allhy[i];
//         grade_crossed[i] = element; 
//         const id = (element[1] + ";" + element[2]).toString();
//         const node = document.getElementById(id);
//         node.className = "warning";
        
//     }

// }