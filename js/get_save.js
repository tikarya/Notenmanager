"use strict";
const object = JSON.parse(localStorage.getItem(localKey));
if (object) {
    localObject = object;  
}
try {
    if (object.FR) {
        document.getElementById("select").value = object.FR.id;
        set_fr(object.FR);
    
    }
    if (object.WPF1) {
        document.getElementById("selectWPF1").value = object.WPF1.sname+","+object.WPF1.valid;
        set_wpf(object.WPF1);
    }
  
    if (localKey =="FOS" && object.WPF2) {
        document.getElementById("selectWPF2").value = object.WPF2.sname+","+object.WPF2.valid;
        set_wpf(object.WPF2); 
    }
    if (object.grades) {
        grades = object.grades;
       for (let i = 0; i < object.grades.array.length; i++) {        
           const gradez = object.grades.array[i];
        
           for (let j = 0; j < gradez.length; j++) {
               if (gradez[j]) {                
                    const grade = gradez[j];
                    if (grade) {
                        set_grades(grade[1]+";"+grade[2],grade[0]);
                    }
                }
           }
       }
       checkCrossing();
       if (grades.count >= getOppotunities()) {
        calculate();
        }
        for (let i = 0; i < grades.average[2].length; i++) {
            const element = grades.average[2][i];
            document.getElementById(i).innerHTML = element;
        }
    }
    
} catch (error) {
    //if sth is null exeptions won't be shown
}

function delete_save(){
    localStorage.removeItem(localKey);
    location.reload();
}


//exprot try
function export_storage(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

//import try
function import_storage(){
    let filepath = document.getElementById("import").files[0];
    let reader = new FileReader();

    reader.readAsText(filepath);
    reader.onload = function(){
        if (confirm("Daten aus " +document.getElementById("import").files[0].name+ " verwenden?")) {
            localStorage.setItem(localKey,JSON.parse(reader.result));
            location.reload();
        }
        
    };
    reader.onerror = function() {
        console.log(reader.error);
    };
}