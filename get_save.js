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
    
} catch (error) {
    //if sht is null error won't be shown
    //console.log(error);
}

    

function delete_save(){
    localStorage.removeItem(localKey);
    location.reload();
}