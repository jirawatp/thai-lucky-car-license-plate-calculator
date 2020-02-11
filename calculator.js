const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let line_no = 0;

const Best = [];
const Ok = [];

const banList = [1, 2, 3, 6, 7, 10, 11, 12, 13, 17, 19, 20, 21, 30, 31, 33, 35, 36, 37, 38, 39, 53, 60, 63, 70, 71, 73, 76, 77, 83, 91, 93, 67, 3888];

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