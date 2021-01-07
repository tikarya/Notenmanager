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

//calculate the average
function calculate(){
    let all = 0;
    for (let i = 0; i < grades.array.length-1; i++) {
        const array = grades.array[i];
        for (let j = 0; j < array.length; j++) { 

            if(array[j] != (null||undefined)){
                let element = array[j];
                // APs have to be counted twice
                if (!(grades.crossed.some((el)=> el === element))){
                    if(element[1] == 2){
                        if (grades.array[i+1][j]!= (null||undefined)) {
                            
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

    let erg = (17/3-5*all/375).toFixed(2);
    if (erg< 1) {
        erg = "1.00";
    }
    document.getElementById("erg").innerText ="Notendurchschnitt: "+ (erg);
        
}
