"use strict";

// Constructor for a Fachrichtung, with its name, profile subjects and type of calculation
function fachrichtung(frname,pfs,dif = false){
    this.name = frname;
    this.pf = pfs;
    this.difmath = dif;
};
// Constructor for WPF, with name and shortname for presentation, and validation if it counts twards the calculation
function wahlpflichtfach(wpfname,shortname,valid){
    this.name = wpfname;
    this.sname= shortname;
    this.val= valid;
}

function mkGrades(){
  
}
// array for grades divides by [1.HY,2.HY,AP]; each grade in the array is another array with[acutal grade, subject];
let grades = [new Array(12),new Array(11),new Array(4)];
let grade_count = 0;

//some debug grades
//grades = [[12,11,10,5,8,11,12,13,15,,5,12],[8,11,12,11,5,14,7,8,9,,11],[2,6,4,8]];

// The different objects for Fachrichtungen (Fr)
const tec = new fachrichtung("Technik",[["Ph","Physik"],["Ch","Chemie"],["M+","Mathe Additum"],["T","Technik"]]);
const health = new fachrichtung("Gesundheit",[["GHW","Gesundheitswissenschaften"],["Bio","Biologie"],["Ch","Chemie"],["KoInt","Kommunikation und Interaktion"]]);
const eco = new fachrichtung("Wirtschaft und Verwaltung",[["BWR","Betriebswirtschaftslehre mit Rechnungswesen"],["R","Rechtslehre"],["VWL","Volkswirtschaftslehre"],["NW","Naturwissenschaften"],["IT","Informatik"]],true);
const social = new fachrichtung("Sozialwesen",[["PsPa","Pädagogik/Psychologie"],["Bio","Biologie"],["Ch","Chemie"],["SWR","Sozialwirtschaft und Recht"],["Soz","Soziologie"]],true);

// Array for output with all Fr connected to select values on index.html
const frs = [tec,health,eco,social];

//Selecting and displaying the Fr and saving selection in Local Storage
function select_fr(fr){
    localStorage.setItem("fr",JSON.stringify(fr));
    if (fr.difmath) {
        document.getElementById("rowPF4").style.display = "table-row";
    }else{
        document.getElementById("rowPF4").style.display = "none";
    }
    for (let i = 0; i < fr.pf.length; i++) {
      const element = fr.pf[i];
      document.getElementById("profilFach"+i).innerText = element[0];
      document.getElementById("profilFach"+i).title = element[1];
  }
}
// basically same thing for Fr but with WPF
function select_wpf(){
    // get node for table
    const selectedWPF = document.getElementById("selectWPF");
    // get node contents
    const wpfname = selectedWPF.options[selectedWPF.selectedIndex].text;
    const vals = selectedWPF.options[selectedWPF.selectedIndex].value.split(",");

    // make WPF object and save it to local Storage
    const wpf = new wahlpflichtfach(wpfname,vals[0],vals[1]);
    localStorage.setItem("wpf",JSON.stringify(wpf));
    //
    const node = document.getElementById("wpf");
    node.innerText = vals[0];
    node.title = wpfname;

    // validating if WPF counts into calculation; see HTML list
    if(vals[1]==false){
        node.className = "notCounted";
    }else{
        node.className = "";
    }
}

//onchange for each grade Input
function setGrades(id){
// get the node form DOM
  let grade = document.getElementById(id);
  // split id into usable indexes [0=subject;1=type (1,2 HJ//AP)]
  const selector = id.split(";");

  // validate grades and set them if valid
  if(grade.value<16&&grade.value>=0){
        if((selector[1] == 0|| selector[1] ==1) &&grades[selector[1]][selector[0]]== undefined){
            //Counts input grades of HYs for crossing them out
                grade_count += 1;
        }
        grades[selector[1]][selector[0]] = [parseInt(grade.value),parseInt(selector[0]),parseInt(selector[1])];
        localStorage.setItem("grades",JSON.stringify(grades));
        grade.className = "";
        checkCrossing();
        if(grade_count>= 17){
            calculate();
        }
    }else{
    // if invalid delete input and display visible varning throug CSS+txt message
        grade.value = "";
        grade.className = "warning";
        grade.placeholder = "!";
    }
}

function checkCrossing(){
    let allhy = grades[0].concat(grades[1]);
    console.log(allhy);

}

// calculate the average
function calculate(){
    let all = 0;
    for (let i = 0; i < grades.length; i++) {
        const array = grades[i];
        for (let j = 0; j < array.length; j++) { 

            if(array[j] != undefined){
                let element = array[j][0];
                 // APs have to be counted twice
                if(i == 2){
                    element *= 2;
                }
                all += element;
            }
        }
    }
    let erg = 17/3-5*all/390;
    //console.log(erg,all);
    document.getElementById("erg").innerText ="Notendurchschnitt: "+ (erg).toFixed(2);
}
