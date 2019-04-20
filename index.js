console.log("Hejsan");
parseCSV();

var dataToDisplay = [];
var popupData = [];
var distanceChanged = 0;
var totalPause = 0;

function parseCSV() {
    var url = "https://raw.githubusercontent.com/antonmedstorta/thesis/master/Data/Johanna.csv";
    Papa.parse(url, {
        delimiter: ";",
        download: true,
        complete: function(results) {
            //console.log("Finished:", results.data)
            dataToDisplay = results.data;
            logData(dataToDisplay);
        }
    });
}

function logData(dataToDisplay) {
    for (var i = 0; i < dataToDisplay.length; i += 30) {
        var floatData = parseFloat(dataToDisplay[i][2]);
        console.log(floatData);

        if (isNaN(floatData)) {

        }
        else {
            distanceChanged = Math.abs(floatData - dataToDisplay[i-30][2]);
            if (distanceChanged < 0.25) {
                totalPause += 1;
            }
        }
    }
    console.log(dataToDisplay.length/30);
    console.log(totalPause);
}


