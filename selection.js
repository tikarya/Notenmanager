"use strict";

// Constructor for a Fachrichtung, with its name, profile subjects and type of calculation
function fachrichtung(frname,pfs,dif = false){
    this.name = frname;
    this.pf = pfs;
    this.difmath = dif;
};
// Constructor for WPF, with name and shortname for presentation and validation if it counts twards the calculation
function wahlpflichtfach(wpfname,shortname,valid){
    this.name = wpfname;
    this.sname= shortname;
    this.val= valid;
}

const tec = new fachrichtung("Technik",[["Ph","Physik"],["T","Technik"],["Ch","Chemie"],["M+","Mathe Additum"]]);
const health = new fachrichtung("Gesundheit",[["GHW","Gesundheitswissenschaften"],["KoInt","Kommunikation und Interaktion"],["Ch","Chemie"],["Bio","Biologie"]]);
const eco = new fachrichtung("Wirtschaft und Verwaltung",[["BWR","Betriebswirtschaftslehre mit Rechnungswesen"],["VWL","Volkswirtschaftslehre"],["NW","Naturwissenschaften"],["IT","Informatik"],["R","Rechtslehre"]],true);
const social = new fachrichtung("Sozialwesen",[["PsPa","Pädagogik/Psychologie"],["SWR","Sozialwirtschaft und Recht"],["Bio","Biologie"],["Soz","Soziologie"],["Ch","Chemie"]],true);

// Array for output with all Fr connected to select values on html files
const frs = [tec,health,eco,social];

//Selecting and displaying the Fr and saving selection in Local Storage
function select_fr(fr){
    localStorage.setItem("fr",JSON.stringify(fr));
    const nodes = document.getElementsByClassName("diff");
    if (fr.difmath) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.classList.add("show"); 
        }
        
    }else{
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.className = "diff"; 
        }
    }
    for (let i = 0; i < fr.pf.length; i++) {
      const element = fr.pf[i];
      document.getElementById("profilFach"+i).innerText = element[0];
      document.getElementById("profilFach"+i).title = element[1];
  }
}
// basically same thing for Fr but with WPF
function select_wpf(id){
    // get node for table
    const selectedWPF = document.getElementById("selectWPF"+id);
    // get node contents
    const wpfname = selectedWPF.options[selectedWPF.selectedIndex].text;
    const vals = selectedWPF.options[selectedWPF.selectedIndex].value.split(",");

    // make WPF object and save it to local Storage
    const wpf = new wahlpflichtfach(wpfname,vals[0],vals[1]);
    localStorage.setItem("wpf"+id,JSON.stringify(wpf));
    //
    const node = document.getElementById("wpf"+id);
    node.innerText = vals[0];
    node.title = wpfname;

    // validating if WPF counts into calculation; see HTML list
    if(vals[1]==false){
        node.className = "notCounted";
    }else{
        node.className = "";
    }
}
