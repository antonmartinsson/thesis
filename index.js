console.log("Hejsan");
test();

function test() {
    var url = "https://raw.githubusercontent.com/antonmedstorta/thesis/master/Data/Johanna.csv";
    Papa.parse(url, {
        download: true,
        complete: function(results) {
            console.log("Finished:", results.data);
        }
    });
}


