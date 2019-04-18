console.log("Hejsan");
test();

function test() {
    Papa.parse("/Data/Johanna.csv", {
        complete: function(results) {
            console.log("Finished:", results.data);
        }
    });
}


