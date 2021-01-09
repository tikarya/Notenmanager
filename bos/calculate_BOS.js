"use strict";

function gradeObject(){
    this.array      = [new Array(12),new Array(11),new Array(4),new Array(4)];
    this.count      = 0;
    this.crossed    = [];
    this.average    = [new Array(12),new Array(12),new Array(12)];
    this.less4HY    = 0;
    this.less3AP    = 0;
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
function getAPCount(){
    return 2;
}
function getPointsPossible(){
    return 375;
}

function evaluate(){
    grades.less4HY = 0;

    const allhy = getAllHY().sort(function(a,b) {
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
    console.log(allhy);
    allhy.forEach((element)=>{
        if(element != (null||undefined)){
            if(element[0]< 4 && !(grades.crossed.some((el)=> el === element))){
                grades.less4HY = (element[0]==0)? (grades.less4HY+2):(grades.less4HY +1);
                console.log(element);
            }
        }
    });

}