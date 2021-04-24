const fs = require("fs");

fs.readFile('ebanoe-it.png', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        fs.writeFile('result.png', data, (err) => {
            console.log(err)
        })
    }
});


