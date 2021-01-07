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

    let array = [grades.array[0].slice(0),grades.array[1].slice(0),grades.array[2].slice(0),grades.array[3].slice(0)];
    array[0].length -= 1;
    array[1].length -= 1;
    array[2].length -= 1;   

    if (localObject.WPF2.valid == 0) {
        array[2].splice(array[2].lastIndexOf(grades.array[2][11]),1);
        array[3].splice(array[2].lastIndexOf(grades.array[3][11]),1);
    }
    if (localObject.WPF1.valid == 0) {
        array[2].splice(array[2].lastIndexOf(grades.array[2][10]),1);
        array[3].splice(array[2].lastIndexOf(grades.array[3][10]),1);
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

function calculate(){
    let all = 0;
    for (let i = 0; i < grades.array.length-1; i++) {
        const array = grades.array[i];
        for (let j = 0; j < array.length; j++) { 

            if(array[j] != (null||undefined)){
                let element = array[j];
                // APs have to be counted twice
                if (!(grades.crossed.some((el)=> el === element))){
                    //console.log(element);

                    if(element[1] == 4){
                        if (grades.array[i+1][j]!= (null||undefined)) {
                            console.log(grades.array[i+1][j]);
                            all += Math.round((((element[0]*2)+ grades.array[i+1][j][0])/3))*2;
                        }else{
                            all += element[0] * 2;
                        }
                    }else{
                        all += element[0];
                    }
                    
                   
                }
            }
        }
    }
    console.log(all);
    let erg = (17/3-5*all/375).toFixed(2);
    if (erg< 1) {
        erg = "1.00";
    }
    document.getElementById("erg").innerText ="Notendurchschnitt: "+ (erg);
        
}
