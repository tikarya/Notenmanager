"use strict";

function gradeObject(){
    this.array      = [new Array(12),new Array(11),new Array(4),new Array(4)];
    this.count      = 0;
    this.crossed    = [];
}
let grades = new gradeObject();

function checkCounting(subject,type){
    if(subject != grades.array[0].length-1              // disregarding FR
        &&(type < grades.array.length-2)                // disregarding APs
        && grades.array[type][subject]== undefined){    // disregarding already counted grades
        if ((subject == 10 && localObject.WPF1.valid == 0)) {
            
        }else{
            //Counts input grades of HYs for crossing them out
            grades.count += 1;
        }
        
    }
}

function getAllHY(){
    let hy1 = grades.array[0].slice(0);
    let hy2 = grades.array[1].slice(0);
    hy1.length -= 1;
    if (localObject.WPF1.valid == 0) {
        hy1.length -= 1;
        hy2.length -= 1;
    }
    
    const array = hy1.concat(hy2);
    return array;
}
function getOppotunities(){
    return 17;
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