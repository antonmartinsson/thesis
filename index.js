parseCSV();

function parseCSV() {
    var participant = document.getElementById("participant").value;
    if (participant == "All") {
        parseAll();
        return;
    }
    var dataToDisplay = [];
    var url = "https://raw.githubusercontent.com/antonmedstorta/thesis/master/Data/" + participant + ".csv";
    Papa.parse(url, {
        delimiter: ";",
        download: true,
        complete: function(results) {
            //console.log("Finished:", results.data)
            dataToDisplay = results.data;
            var panelArray = panelData(dataToDisplay);
            var popupArray = popupData(dataToDisplay);
            var enlargeArray = enlargeData(dataToDisplay);

            changePanel(dataForPanel(panelArray[0], panelArray[1]));
            changePopup(dataForPopup(popupArray[0], popupArray[1]));
            changeEnlarge(dataForEnlarge(enlargeArray[0], enlargeArray[1]));
        }
    });
}

function parseAll() {
    var totalPanelPause = 0;
    var totalPanelActive = 0;
    var totalPopupPause = 0;
    var totalPopupActive = 0;
    var totalEnlargePause = 0;
    var totalEnlargeActive = 0;

    var participants = new Array();
    var participantDropDown = document.getElementById("participant");
    for (i = 0; i < participantDropDown.options.length; i++) {
        participants[i] = participantDropDown.options[i].value;
    }

    for (participant = 0; participant < participants.length; participant++) {
        if (participants[participant] != "All") {
            if (participants[participant] != "Johanna") {

            var url = "https://raw.githubusercontent.com/antonmedstorta/thesis/master/Data/" + participants[participant] + ".csv";
            Papa.parse(url, {
                delimiter: ";",
                download: true,
                complete: function(results) {
                    //console.log("Finished:", results.data)
                    dataToDisplay = results.data;
                    var panelArray = panelData(dataToDisplay);
                    var popupArray = popupData(dataToDisplay);
                    var enlargeArray = enlargeData(dataToDisplay);
    
                    totalPanelPause += panelArray[1];
                    totalPopupPause += popupArray[1];
                    totalEnlargePause += enlargeArray[1];
    
                    totalPanelActive += panelArray[0];
                    totalPopupActive += popupArray[0];
                    totalEnlargeActive += enlargeArray[0];

                    if (participant == participants.length) {
                        var totalPanelTime = totalPanelActive + totalPanelPause;
                        var totalPopupTime = totalPopupActive + totalPopupPause;
                        var totalEnlargeTime = totalEnlargeActive + totalEnlargePause;

                        changePanel(dataForPanel(totalPanelActive, totalPanelPause));
                        changePopup(dataForPopup(totalPopupActive, totalPopupPause));
                        changeEnlarge(dataForEnlarge(totalEnlargeActive, totalEnlargePause));
                        
                        document.getElementById("panelTime").innerText = Math.round((totalPanelActive + totalPanelPause) / 13);
                        document.getElementById("popupTime").innerText = Math.round((totalPopupActive + totalPopupPause) / 13);
                        document.getElementById("enlargeTime").innerText = Math.round((totalEnlargeActive + totalEnlargePause) / 13);
                        document.getElementById("inSeconds").innerText = "in seconds (average, rounded)";   
                        
                        document.getElementById("panelPercentages").textContent = "Active: " + Math.round((totalPanelActive/totalPanelTime)*100) + "%";
                        document.getElementById("popupPercentages").textContent = "Active: " + Math.round((totalPopupActive/totalPopupTime)*100) + "%";
                        document.getElementById("enlargePercentages").textContent = "Active: " + Math.round((totalEnlargeActive/totalEnlargeTime)*100) + "%";

                        document.getElementById("panelPercentages2").textContent = "Pause: " + Math.round((totalPanelPause/totalPanelTime)*100) + "%";
                        document.getElementById("popupPercentages2").textContent = "Pause: " + Math.round((totalPopupPause/totalPopupTime)*100) + "%";
                        document.getElementById("enlargePercentages2").textContent = "Pause: " + Math.round((totalEnlargePause/totalEnlargeTime)*100) + "%";

                    }
                }
            });
        }}
    }

}

function panelData(dataToDisplay, all) {
    var totalPause = 0;
    var distanceChanged = 0;
    var panelTotal = 0;

    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][2]);

        if (isNaN(floatData)) {

        }
        else {
            panelTotal += 1;

            // Check if a dot is missing (because of formatting in Swedish Excel software, add it if it's not there). 
            if (floatData.toString().charAt(2) == ".")  {
                distanceChanged = Math.abs(floatData - dataToDisplay[i-30][2]);
                if (distanceChanged < 0.15) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][2]);
                if (distanceChanged < 0.15) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var panelPause = totalPause;
    var panelActive = panelTotal - panelPause;
    document.getElementById("panelTime").innerText = panelTotal;
    document.getElementById("inSeconds").innerText = "in seconds (rounded)";
    
    document.getElementById("panelPercentages").textContent = "Active: " + Math.round((panelActive/panelTotal)*100) + "%";
    document.getElementById("panelPercentages2").textContent = "Pause: " + Math.round((panelPause/panelTotal)*100) + "%";

    var panel = [panelActive, panelPause];
    return panel;
}

function popupData(dataToDisplay) {
    var totalPause = 0;
    var distanceChanged = 0;
    var popupTotal = 0;


    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][0]);

        if (isNaN(floatData)) {

        }
        else {
            popupTotal += 1;
            // Check if a dot is missing (because of formatting in Swedish Excel software, add it if it's not there). 
            if (floatData.toString().charAt(2) == ".")  {
                distanceChanged = Math.abs(floatData - dataToDisplay[i-30][0]);
                if (distanceChanged < 0.15) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][0]);
                if (distanceChanged < 0.15) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var popupPause = totalPause;
    var popupActive = popupTotal - popupPause;
    document.getElementById("popupTime").innerText = popupTotal;
    document.getElementById("inSeconds").innerText = "in seconds (rounded)";

    document.getElementById("popupPercentages").textContent = "Active: " + Math.round((popupActive/popupTotal)*100) + "%";
    document.getElementById("popupPercentages2").textContent = "Pause: " + Math.round((popupPause/popupTotal)*100) + "%";

    var popupArray = [popupActive, popupPause];
    return popupArray;

}

function enlargeData(dataToDisplay) {
    var totalPause = 0;
    var distanceChanged = 0;
    var enlargeTotal = 0;


    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][1]);

        if (isNaN(floatData)) {

        }
        else {
            enlargeTotal += 1;
            // Check if a dot is missing (because of formatting in Swedish Excel software, add it if it's not there). 
            if (floatData.toString().charAt(2) == ".") {
                distanceChanged = Math.abs(floatData - dataToDisplay[i-30][1]);
                if (distanceChanged < 0.15) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][1]);
                if (distanceChanged < 0.15) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var enlargePause = totalPause;
    var enlargeActive = enlargeTotal - enlargePause;
    document.getElementById("enlargeTime").innerText = enlargeTotal;
    document.getElementById("inSeconds").innerText = "in seconds (rounded)";

    document.getElementById("enlargePercentages").textContent = "Active: " + Math.round((enlargeActive/enlargeTotal)*100) + "%";
    document.getElementById("enlargePercentages2").textContent = "Pause: " + Math.round((enlargePause/enlargeTotal)*100) + "%";
    
    var enlargeArray = [enlargeActive, enlargePause];
    return enlargeArray;

}


