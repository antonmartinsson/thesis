console.log("Hejsan");
parseCSV();


function parseCSV() {
    var participant = document.getElementById("participant").value;
    var dataToDisplay = [];
    var url = "https://raw.githubusercontent.com/antonmedstorta/thesis/master/Data/" + participant + ".csv";
    Papa.parse(url, {
        delimiter: ";",
        download: true,
        complete: function(results) {
            //console.log("Finished:", results.data)
            dataToDisplay = results.data;
            console.log(dataToDisplay);
            panelData(dataToDisplay);
            popupData(dataToDisplay);
            enlargeData(dataToDisplay);
        }
    });
}

function panelData(dataToDisplay) {
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
                if (distanceChanged < 0.3) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][2]);
                if (distanceChanged < 0.3) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var panelActive = dataToDisplay.length/30 - totalPause;
    var panelPause = totalPause;
    changePanel(dataForPanel(panelActive, panelPause));
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
                if (distanceChanged < 0.3) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][0]);
                if (distanceChanged < 0.3) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var popupActive = dataToDisplay.length/30 - totalPause;
    var popupPause = totalPause;
    // console.log(popupActive);
    // console.log(totalPause);
    changePopup(dataForPopup(popupActive, popupPause));

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
                if (distanceChanged < 0.3) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            } 
            else {
                var newFloatData = parseFloat(floatData.toString().slice(0,2) + "." + floatData.toString().slice(2, floatData.toString().length));
                console.log("NEW FLOAT DATA: " + newFloatData);
                distanceChanged = Math.abs(newFloatData - dataToDisplay[i-30][1]);
                if (distanceChanged < 0.3) {
                    // console.log("Second added");
                    totalPause += 1;
                }
            }
        }
    }
    var enlargeActive = dataToDisplay.length/30 - totalPause;
    var enlargePause = totalPause;
    // console.log(enlargeActive);
    // console.log(totalPause);
    changeEnlarge(dataForEnlarge(enlargeActive, enlargePause));

}


