"use strict";

//calculate the average
function calculate(){
    let all = 0;
    grades.less3AP = 0;
    for (let i = 0; i < grades.array.length-1; i++) {
        const array = grades.array[i];
        for (let j = 0; j < array.length; j++) { 

            if(array[j] != (null||undefined)){
                let element = array[j];
                if (!(grades.crossed.some((el)=> el === element))){
                    if(element[1] == grades.array.length-2){
                        let apGrade= element[0];
                        if (grades.array[i+1][j]!= (null||undefined)) {
                            apGrade = Math.round((((element[0]*2)+ grades.array[i+1][j][0])/3));
                        }
                        if (apGrade <4) {
                            grades.less3AP = (apGrade ==0)?(grades.less3AP+2):(grades.less3AP+1);
                        }
                            // APs have to be counted multiple times
                            all += apGrade * getAPCount();
                    }else{
                        all += element[0];
                    }

                }
            }
        }
    }
    evaluate(all);
    let erg = (17/3-5*all/getPointsPossible()).toFixed(2);
    if (erg< 1) {
        erg = "1.00";
    }
    document.getElementById("erg").innerText ="Notendurchschnitt: "+ (erg);
        
}

function set_average(subject){

    grades.average[0][subject] = 0;
    grades.average[1][subject] = 0;

    for (let i = 0; i < grades.array.length-1; i++) {
        const element = grades.array[i][subject];
        if (element != (undefined||null)) {
            if (!(grades.crossed.some((el)=> el === element))){  
                if(i == grades.array.length-2){
                    if (grades.array[i+1][subject]!= (null||undefined)) {
                        grades.average[1][subject] += Math.round((((element[0]*2+grades.array[i+1][subject][0])/3))*(getAPCount()));
                    }else{
                        // APs have to be counted twice
                        grades.average[1][subject] += grades.array[i][subject][0]*(getAPCount());
                    }
                    grades.average[0][subject] +=(getAPCount());

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


function evaluate(all){
    grades.less4HY = 0;
    for (let i = 0; i < grades.average[2].length; i++) {
        const element = grades.average[2][i];
        if (element<4 && element != (null||undefined)) {
            grades.less4HY = (element ==0)?(grades.less4HY+2):(grades.less4HY+1);
        }
    }

    let node = document.getElementById("eval");

    if (grades.less4HY>2) {
        node.innerHTML = "Nicht bestanden :(<br>Halbjahresergebnisse langen nicht";
    }else if(grades.less4HY > 1 && all<getLowestPoints()[0]){
        node.innerHTML = "Nicht bestanden :(<br>Halbjahresergebnisse in Kombi mit AP langen nicht";
    }else if (grades.less4HY > 0 && all<getLowestPoints()[1]){
        node.innerHTML = "Nicht bestanden :(<br>Halbjahresergebnisse in Kombi mit AP langen nicht";
    }else{
        if (grades.less3AP>2) {
            node.innerHTML = "Nicht bestanden :(<br>Abschlusspruefungsergebnisse langen nicht";
        }else{
            node.innerHTML = "Bestanden :)";
        }
    }

}