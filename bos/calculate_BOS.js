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

//calculate the average
function calculate(){
    let all = 0;
    for (let i = 0; i < grades.array.length-1; i++) {
        const array = grades.array[i];
        for (let j = 0; j < array.length; j++) { 

            if(array[j] != (null||undefined)){
                let element = array[j];
                if (!(grades.crossed.some((el)=> el === element))){
                    
                    if(element[1] == 2){
                        if (grades.array[i+1][j]!= (null||undefined)) {
                            all += Math.round((((element[0]*2)+ grades.array[i+1][j][0])/3))*2;
                        }else{
                            // APs have to be counted twice
                            all += element[0] * 2;
                        }
                    }else{
                        all += element[0];
                    }

                }
            }
        }
    }

    let erg = (17/3-5*all/375).toFixed(2);
    if (erg< 1) {
        erg = "1.00";
    }
    document.getElementById("erg").innerText ="Notendurchschnitt: "+ (erg);
        
}
function set_average(subject){

    grades.average[0][subject] = 0;
    grades.average[1][subject] = 0;

    for (let i = 0; i < 3; i++) {
        const element = grades.array[i][subject];
        if (element != (undefined||null)) {
            if (!(grades.crossed.some((el)=> el === element))){  
                if(i == 2){
                    if (grades.array[i+1][subject]!= (null||undefined)) {
                        grades.average[1][subject] += Math.round((((element[0]*2+grades.array[i+1][subject][0])/3))*2);
                    }else{
                        // APs have to be counted twice
                        grades.average[1][subject] += grades.array[i][subject][0]*2;
                    }
                    grades.average[0][subject] +=2;

                }else{
                    grades.average[1][subject] += grades.array[i][subject][0];
                    grades.average[0][subject]++;
                }

            }
               
        }
    }
    for (let i = 0; i < grades.average[0].length; i++) {
        const element = grades.average[0][i];
        if (element != (undefined||null) && grades.average[1][i]!= (undefined||null)) {
            grades.average[2][i] = (grades.average[1][i]/element).toFixed(2);
            document.getElementById(i).innerHTML = grades.average[2][i];
        }
    }
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