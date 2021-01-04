"use strict";

function gradeObject(){
    this.array      = [new Array(13),new Array(13),new Array(14),new Array(12),new Array(4),new Array(4)];
    this.count      = 0;
    this.crossed    = [];
}
let grades = new gradeObject();

function checkCounting(subject,type){
    if((subject != grades.array[2].length-1 )                                         // disregarding FR
        &&(type < grades.array.length-2)                                              // disregarding APs
        && grades.array[type][subject]== undefined
        &&subject != grades.array[1].length-1 ){                                  // disregarding already counted grades7

        if ((subject == 10 && localObject.WPF1.valid == 0 || subject == 11 && localObject.WPF2.valid == 0)) {
            
        }else{
            //Counts input grades of HYs for crossing them out
            grades.count += 1;
        }
        
    }
}

function getAllHY(){
    let allhy = grades.array[0];
    for (let i = 1; i < grades.array.length-2; i++) {
        allhy = allhy.concat(grades.array[i]);
    }
    return allhy;
}
function getOppotunities(){
    return 25;
}