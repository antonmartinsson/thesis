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

    for (participant in participants) {
        if (participants[participant] != "All") {
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

                    if (i == participants.length) {
                        changePanel(dataForPanel(totalPanelActive, totalPanelPause));
                        changePopup(dataForPopup(totalPopupActive, totalPopupPause));
                        changeEnlarge(dataForEnlarge(totalEnlargeActive, totalEnlargePause));
                    }
                }
            });
        }
    }

}

function panelData(dataToDisplay, all) {
    var totalPause = 0;
    var distanceChanged = 0;

    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][2]);

        if (isNaN(floatData)) {

        }
        else {
            // Check if a dot is missing (because of formatting in Swedish Excel software, add it if it's not there). 
            if (floatData.toString().charAt(2) == ".")  {
                distanceChanged = Math.abs(floatData - dataToDisplay[i-30][2]);
                if (distanceChanged < 0.25) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][2]);
                if (distanceChanged < 0.25) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var panelActive = dataToDisplay.length/30 - totalPause;
    var panelPause = totalPause;

    var panel = [panelActive, panelPause];
    return panel;
}

function popupData(dataToDisplay) {
    var totalPause = 0;
    var distanceChanged = 0;

    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][0]);

        if (isNaN(floatData)) {

        }
        else {
            // Check if a dot is missing (because of formatting in Swedish Excel software, add it if it's not there). 
            if (floatData.toString().charAt(2) == ".")  {
                distanceChanged = Math.abs(floatData - dataToDisplay[i-30][0]);
                if (distanceChanged < 0.25) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][0]);
                if (distanceChanged < 0.25) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var popupActive = dataToDisplay.length/30 - totalPause;
    var popupPause = totalPause;

    var popupArray = [popupActive, popupPause];
    return popupArray;

}

function enlargeData(dataToDisplay) {
    var totalPause = 0;
    var distanceChanged = 0;

    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][1]);

        if (isNaN(floatData)) {

        }
        else {
            // Check if a dot is missing (because of formatting in Swedish Excel software, add it if it's not there). 
            if (floatData.toString().charAt(2) == ".") {
                distanceChanged = Math.abs(floatData - dataToDisplay[i-30][1]);
                if (distanceChanged < 0.25) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][1]);
                if (distanceChanged < 0.25) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var enlargeActive = dataToDisplay.length/30 - totalPause;
    var enlargePause = totalPause;
    
    var enlargeArray = [enlargeActive, enlargePause];
    return enlargeArray;

}


