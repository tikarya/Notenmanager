"use strict";

function gradeObject(){
    this.array      = [new Array(14),new Array(14),new Array(15),new Array(13),new Array(4),new Array(4)];
    this.count      = 0;
    this.crossed    = [];
    this.average    = [new Array(15),new Array(15),new Array(15)];
    this.less4HY    = 0;
    this.less3AP    = 0;
}
let grades = new gradeObject();

function checkCounting(subject,type){
    if((subject != grades.array[2].length-1 )                                         // disregarding FR
        &&(type < grades.array.length-2)                                              // disregarding APs
        && grades.array[type][subject]== undefined
        &&subject != grades.array[1].length-1 ){                                  // disregarding already counted grades7

        if ((subject == 11 && localObject.WPF1.valid == 0 || subject == 12 && localObject.WPF2.valid == 0)) {
            
        }else{
            //Counts input grades of HYs for crossing them out
            grades.count += 1;
        }
        
    }
}

function getAllHY(){

    let array = [grades.array[0].slice(0),grades.array[1].slice(0),grades.array[2].slice(0),grades.array[3].slice(0)];
    array[0].length -= 1;
    array[1].length -= 1;
    array[2].length -= 1;   

    if (localObject.WPF2.valid == 0) {
        array[2].splice(array[2].lastIndexOf(grades.array[2][12]),1);
        array[3].splice(array[2].lastIndexOf(grades.array[3][12]),1);
    }
    if (localObject.WPF1.valid == 0) {
        array[2].splice(array[2].lastIndexOf(grades.array[2][11]),1);
        array[3].splice(array[2].lastIndexOf(grades.array[3][11]),1);
    }

    let allhy = array[0];
    for (let i = 1; i < array.length; i++) {
        allhy = allhy.concat(array[i]);
    }
    return allhy;
}

function getOppotunities(){
    return 25;
}

function getAPCount(){
    return 3;
}

function getPointsPossible(){
    return 600;
}
function getLowestPoints(){
    return [240,200];
}