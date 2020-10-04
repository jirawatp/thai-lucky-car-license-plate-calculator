const readline = require('readline');
const fs = require('fs');
const { banList } = require('./banList.js');

let rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let line_no = 0;

const Best = [];
const Ok = [];

// event is emitted after each line
rl.on('line', function(line) {
    line_no++;
    // console.log(line);

    if(!banList.includes(parseInt(line))) {
        const numberArr = line.split('');

        function sum(calArr) {
            let sumResult = calArr.reduce((a, b) => {
                return parseInt(a) + parseInt(b);
            });
    
            return sumResult > 9 ? sum(sumResult.toString().split('')) : sumResult;
        }
        
        const result = sum(numberArr);
    
        if ([2, 5, 8, 9].includes(result)) {
            Best.push(line);
        } else if ([1, 4, 6].includes(result)) {
            Ok.push(line);
        }
    }
});

// end
rl.on('close', function(line) {
    console.log('Total lines : ' + line_no);

    let bestStr = '';

    Best.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    }).forEach((num) => {
        bestStr += `${num}\n`;
    });

    fs.writeFile('bestNumber.txt', bestStr, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('best saved!');
    });

    let okStr = '';

    Ok.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    }).forEach((num) => {
        okStr += `${num}\n`;
    });

    fs.writeFile('okNumber.txt', okStr.toString(), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('ok saved!');
    });
});