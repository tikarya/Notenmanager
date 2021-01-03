"use strict";

function gradeObject(){
    this.array      = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
    this.count      = 0;
    this.crossed    = [];
}
let grades = new gradeObject();

function select_grade(id){
    // get the node form DOM
    let grade = document.getElementById(id);
    // split id into usable indexes [0=type (1,2 HJ//AP);1=subject]
    const selector = id.split(";");
    const type = selector[0];
    const subject = selector[1];
    
    // validate input and set if valid
      if(grade.value<16&&grade.value>=0){
            if((type < grades.array.length-1) && grades.array[type][subject]== undefined){
                
                //Counts input grades of HYs for crossing them out
                    grades.count += 1;
            }
            grades.array[type][subject] = [parseInt(grade.value),parseInt(type),parseInt(subject)];

            localObject.grades = grades;
            localStorage.setItem(localKey,JSON.stringify(localObject));

            grade.className = "";
            
        }else{
        // if invalid delete input and display visible varning throug CSS+txt message
            grade.value = "";
            grade.className = "invalid";
            grade.placeholder = "!";
        }
    }