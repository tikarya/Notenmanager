"use strict";
const object = JSON.parse(localStorage.getItem(localKey));

try {
    document.getElementById("select").value = object.FR.id;
    set_fr(object.FR);

    document.getElementById("selectWPF1").value = object.WPF1.sname+","+object.WPF1.valid;
    set_wpf(object.WPF1);
    if (localKey =="FOS") {
        document.getElementById("selectWPF2").value = object.WPF2.sname+","+object.WPF2.valid;
        set_wpf(object.WPF2); 
    }
    
} catch (error) {
    console.log(error);
}

