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
       for (let i = 0; i < object.grades.array.length; i++) {        
           const gradez = object.grades.array[i];
        
           for (let j = 0; j < gradez.length; j++) {
            console.log(j);
            
               if (gradez[j]) {                
                    const grade = gradez[j];
                    if (grade) {
                        set_grades(grade[1]+";"+grade[2],grade[0]);
                    }
                }
           }
       }
        
    }
    
} catch (error) {
    //if sht is null error won't be shown
    //console.log(error);
}

    

function delete_save(){
    localStorage.removeItem(localKey);
    location.reload();
}