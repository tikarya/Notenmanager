"use strict";
// Storage object
let localObject = {};

//----------------------------------------------------------------------------------------------------------
//                                            FachRichtungen
//----------------------------------------------------------------------------------------------------------

// Constructor for a Fachrichtung, with its name, profile subjects and type of calculation
function fachrichtung(_id,_name,_profilsubjects,_calcdif = false){
    this.id             = _id;
    this.name           = _name;
    this.profilsubjects = _profilsubjects;
    this.calcdif        = _calcdif;
};

//fr objects for each available fr
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
    enable_grades();
}

//----------------------------------------------------------------------------------------------------------
//                                            WahlPlichtFach
//----------------------------------------------------------------------------------------------------------

// Constructor for WPF
function wahlpflichtfach(_id,_listNR,_name,_shortname,_validation){
    this.id     = _id;          // mainly for FOS since they have 2 WPFs
    this.listNR = _listNR;      // corresponds to the html select options index
    this.name   = _name;        // Actual name for tooltip
    this.sname  = _shortname;   // used in table, for compact layout
    this.valid  = _validation;  // if its grade counts twards the calculation
}

//get input from select (option onchange)
function select_wpf(id){
    // get node from select
    const selectedWPF = document.getElementById("selectWPF"+id);
    // get node contents
    const wpfname = selectedWPF.options[selectedWPF.selectedIndex].text;            //Name of WPF
    const vals = selectedWPF.options[selectedWPF.selectedIndex].value.split(",");   //Seperate the index and the validation form node value

    // make WPF object with values form node and save it to local Storage
    const wpf = new wahlpflichtfach(id,selectedWPF.selectedIndex,wpfname,vals[0],vals[1]);
    localObject["WPF"+id] = wpf;
    localStorage.setItem(localKey,JSON.stringify(localObject));
    
    set_wpf(wpf);
}
// put contents of wpf into table
function set_wpf(wpf){
    // select right node form table
    const node = document.getElementById("wpf"+wpf.id);
    // put short name as text and long as tooltip
    node.innerText = wpf.sname;
    node.title = wpf.name;
        
    // validating if WPF counts into calculation; indicating by visual color change (CSS class: notCounted)
    if(wpf.valid==false){
        node.className = "notCounted";
    }else{
    // if not make sure class is reset
        node.className = "";
    }

    // disable input for the wpf select
    document.getElementById("selectWPF"+wpf.id).disabled = true;

    // check if all the WPF and the FR are selected
    enable_grades();
    
    // disable the selected wpf in the other select for FOS
    if (localKey=="FOS") {
        let otherid = (wpf.id == 1) ? 2:1;
        document.getElementById("selectWPF"+otherid)[wpf.listNR].disabled = true;
    }

}
//----------------------------------------------------------------------------------------------------------
//                                            grades
//----------------------------------------------------------------------------------------------------------

// after wpf and fr are selected, the grades can be put in
function enable_grades(){
    if(localObject.FR && localObject.WPF1 && (localKey == "BOS" || localObject.WPF2)){
    document.querySelectorAll('input[type=number]').forEach((element) =>element.disabled = false);
    }
}

//input for grades
function select_grade(id){
    // get the node form DOM
    let grade = document.getElementById(id);
    // split id into usable indexes [0=type (1,2 HJ//AP);1=subject]
    const selector = id.split(";");
    const type = selector[0];
    const subject = selector[1];
    // Regular expression to validate the input isn't float or letter etc.
    const regex = RegExp("^[1]?[0-9]{0,1}$");

    // validate input and set if valid
    if (grade.value =="") {
        // remove grade from storage after it got deleted
        // important for manual crossing
        if(type != grades.array.length-1)
        grades.count--;
        // delete form working object
        grades.array[type][subject] = null;
        localObject.grades = grades;
        // renew localstorage
        localStorage.setItem(localKey,JSON.stringify(localObject));

        grade.className = "";
        // if oral exam and not english count down and enable other input
        if (type == grades.array.length-1 && subject != 1) {
            let deleted = grades.oralGrades.findIndex((element) => element == subject);
            grades.oralGrades.splice(deleted,1);
            localStorage.setItem(localKey,JSON.stringify(localObject));
            set_oralCount();
        }
        // refresh all calculations
        checkCrossing();
        set_average(subject,type);
    //check if grade valid w/regex and size
    }else if(regex.test(grade.value) && grade.value<16 && grade.value>=0){
        //see if it gets counted to final result
        checkCounting(subject,type);
        // add to working objects and storage
        grades.array[type][subject] = [parseInt(grade.value),parseInt(type),parseInt(subject)];
        localObject.grades = grades;
        localStorage.setItem(localKey,JSON.stringify(localObject));
        grade.className = "";
        checkCrossing();
        set_average(subject,type);
        if (type == grades.array.length-1) {
            checkOralOpportunities(subject);
        }
        
            
    }else{
        // if invalid delete input and display visible varning throug CSS class: invalid+txt message
        grade.value = "";
        grade.className = "invalid";
        grade.placeholder = "!";
    }
    // when enough grades are put in, calculate
    if (grades.count >= getOppotunities()) {
        calculate();
    }
}
// used to restore grades from local Storage into html input elements (get_save.js)
function set_grades(id,value){
    let grade = document.getElementById(id);
    grade.value = value;
}  

// checking which grades won't count into final result
function checkCrossing(){
    // all counting halfyear grades
    let allhy = getAllHY();
    // sort them form low to high
    allhy.sort(function(a,b) {
        if (a === b) {
                return 0;
        }else if (a === null) {
                return 1;
        }else if (b === null) {
            return -1;
        }else{
            return a[0]-b[0] 
        }   

    });
    // remove already crossed grades
    // important because array gets renewed on each new change/input
    if (grades.crossed) {
        grades.crossed.forEach(element => {
            if (element) {
                const id = (element[1] + ";" + element[2]).toString();
                document.getElementById(id).className = undefined;
                grades.crossed = [];
                set_average(element[2]);
            }
        });
    }
    // number of crossed grades
    let crossed = 0;
    // number of crossing opportunities
    let opportunities = grades.count-getOppotunities();
    // grades that have been checked, to check for double cross on one subject
    let checked_grades = [];
    // actual checking what to cross
    // while possible number is bigger than already crossed grades
    while(crossed < opportunities){
        let element = allhy[crossed];
        const already_crossed = checked_grades.findIndex((el)=> el == element[2]);
        if (already_crossed < 0) {
  
        if (element[2]==allhy[crossed+1][2]){
            if (element[0]>allhy[crossed+1][0]) {
                opportunities++;
                crossed++;
                
            }
        }
        element = allhy[crossed];
        checked_grades[crossed] = element[2];
        grades.crossed[crossed] = element;
        // since grade is crossed calculate subject average again
        set_average(element[2]);
        // make crossing visible though CSS class crossed
        const id = (element[1] + ";" + element[2]).toString();
        const node = document.getElementById(id);
        node.className = "crossed";
        // if the grade after is from same subject, hop over it (count goes up by 2)
        if (element[2]==allhy[crossed+1][2] && element[0]==allhy[crossed+1][0]) {
            opportunities++;
            crossed++;  
        }
    }else{
        opportunities++;
    }
        crossed++;
    }

}

function checkOralOpportunities(subject){
    if (grades.oralGrades.length<2 && subject != 1 && !(grades.oralGrades.some((el)=> el === subject))) {
        grades.oralGrades.push(subject);
        localStorage.setItem(localKey,JSON.stringify(localObject));
    }
    set_oralCount();
}
function set_oralCount(){
    if (grades.oralGrades.length == 2) {
        for (let i = 0; i < grades.array[grades.array.length-1].length; i++) {
            const element = grades.array[grades.array.length-1][i];
            if (element == (undefined || null) && i!=1) {
                document.getElementById(grades.array.length-1+";"+i).disabled = true;
            }
            
        }
    }else{
        for (let i = 0; i < grades.array[grades.array.length-1].length; i++) {
            document.getElementById(grades.array.length-1+";"+i).disabled = false;
        }
    }
}