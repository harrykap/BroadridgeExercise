import * as readline from 'node:readline';
import * as fs from 'node:fs';

import Graph from './Graph.js';

const inputFile = readline.createInterface({
    input: fs.createReadStream('connections.txt'),
    output: process.stdout,
    terminal: false
});

const pairs = [];
let lineNumber = 0;
console.log('Loading connections file');
inputFile.on('line', line => {
    const pair = line.split(',').map(key => key.trim());
    if(pair.length === 2) {
        pairs.push(pair);
    } else {
        console.log(`l:${lineNumber} not a proper pair:`, line);
    }
    lineNumber++;
})

inputFile.on('close', line => {
   const graph = new Graph(pairs);

    const inputReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Enter comma separated city pair: '
    });


    inputReader.on('line', (line) => {
        const pair = line.split(',').map(key => key.trim());
        if(pair.length === 2 ) {
            console.log(`${pair[0]} and ${pair[1]} are ${graph.areConnected(pair) ? '' : 'not '}connected`);
        } else console.log(`\'${line}\' is not a properly formatted pair`)
        inputReader.prompt();
    }).on('close', () => {
        console.log('so long !!!');
        process.exit(0);
    });

    inputReader.prompt();
});














