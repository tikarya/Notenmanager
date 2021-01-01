"use strict";
// Storage object
let localObject = {};

// Constructor for a Fachrichtung, with its name, profile subjects and type of calculation
function fachrichtung(_id,_name,_profilsubjects,_calcdif = false){
    this.id             = _id;
    this.name           = _name;
    this.profilsubjects = _profilsubjects;
    this.calcdif        = _calcdif;
};

const tec       = new fachrichtung(0,"Technik",                     [["Ph","Physik"],["T","Technik"],["Ch","Chemie"],["M+","Mathe Additum"]]);
const health    = new fachrichtung(1,"Gesundheit",                  [["GHW","Gesundheitswissenschaften"],["KoInt","Kommunikation und Interaktion"],["Ch","Chemie"],["Bio","Biologie"]]);
const eco       = new fachrichtung(2,"Wirtschaft und Verwaltung",   [["BWR","Betriebswirtschaftslehre mit Rechnungswesen"],["VWL","Volkswirtschaftslehre"],["NW","Naturwissenschaften"],["IT","Informatik"],["R","Rechtslehre"]],   true);
const social    = new fachrichtung(3,"Sozialwesen",                 [["PsPa","Pädagogik/Psychologie"],["SWR","Sozialwirtschaft und Recht"],["Bio","Biologie"],["Soz","Soziologie"],["Ch","Chemie"]],                                true);

// Array for output with all Fr connected to select values on html files
const frs = [tec,health,eco,social];

//Selecting and displaying the Fr and saving selection in Local Storage
function select_fr(fr){
    localObject.FR = fr;
    localStorage.setItem(localKey,JSON.stringify(localObject));
    set_fr(fr);
}
function set_fr(fr){
    const nodes = document.getElementsByClassName("diff");
    if (fr.calcdif){
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.classList.add("show"); 
        }
        
    }
    for (let i = 0; i < fr.profilsubjects.length; i++) {
      const element = fr.profilsubjects[i];
      document.getElementById("profilFach"+i).innerText = element[0];
      document.getElementById("profilFach"+i).title = element[1];
    }
    document.getElementById("select").disabled = true;
}
//----------------------------------------------------------------------------------------------------------
// Constructor for WPF, with name and shortname for presentation and validation if it counts twards the calculation
function wahlpflichtfach(_id,_listNR,_name,_shortname,_validation){
    this.id     = _id;
    this.listNR = _listNR;
    this.name   = _name;
    this.sname  = _shortname;
    this.valid  = _validation;
}


function select_wpf(id){
    // get node for table
    const selectedWPF = document.getElementById("selectWPF"+id);
    // get node contents
    const wpfname = selectedWPF.options[selectedWPF.selectedIndex].text;
    const vals = selectedWPF.options[selectedWPF.selectedIndex].value.split(",");

    // make WPF object and save it to local Storage
    const wpf = new wahlpflichtfach(id,selectedWPF.selectedIndex,wpfname,vals[0],vals[1]);
    localObject["WPF"+id] = wpf;
    localStorage.setItem(localKey,JSON.stringify(localObject));
    set_wpf(wpf);
}

function set_wpf(wpf){
    const node = document.getElementById("wpf"+wpf.id);
    node.innerText = wpf.sname;
    node.title = wpf.name;
        
    // validating if WPF counts into calculation; see HTML list
        if(wpf.valid==false){
            node.className = "notCounted";
        }else{
            node.className = "";
        }

    // disable input for the wpf
    document.getElementById("selectWPF"+wpf.id).disabled = true;
    
    // // disable the selected wpf in the other select
    // let otherid = 2;
    // if (id = 2) {
    //     otherid =1;
    // }
}