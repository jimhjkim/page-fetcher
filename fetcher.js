const request = require('request');
const fs = require('fs');

let userInput = process.argv.slice(2); // array
const fetcher = function(url, path) {
  request(url, (error, response, body) => { //-> request from url
    if (response.statusCode !== 200) return console.log(`file write terminated --- ${response.statusCode}`);
    if(error) throw error; // Print the error if one occurred
    // write to file
    fs.writeFile(path, body, (err) => {
      if (err) throw err; // throw error for writing to file
      const size = fs.stat(path, (err, stats) => {
        if (err) throw error; // throw error for calculating file size
        console.log(`Downloaded and saved ${stats.size} bytes to ${path}`)
      })
    });
  });
};
fetcher(userInput[0], userInput[1]);
