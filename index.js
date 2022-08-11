import * as readline from 'node:readline';
import * as fs from 'node:fs';

class Graph {
    constructor(pairs) {
        this.vertices = new Map();
        pairs.forEach(pair => {
            pair.forEach(item => {
                if (!this.vertices.has(item)) {
                    this.vertices.set(item, {label: item, visited: false, color: null, adjacent: []});
                }
            })
            this.connect(pair);
        });
        this.colorize();
    }

    connect(pair) {
        this.vertices.get(pair[0].trim()).adjacent.push(pair[1]);
        this.vertices.get(pair[1].trim()).adjacent.push(pair[0]);
    }

    depthTraversal(vertex, colorize= false, color = null, callback = null) {
        vertex.visited = true;
        if(colorize) {
            vertex.color = color;
        }
        vertex.adjacent.forEach(key => {
            const vertex = this.vertices.get(key);
            if (!vertex.visited) {
                this.depthTraversal(vertex, colorize, color, callback);
            }
        });
        if(callback) {
            callback(vertex);
        }
    }

    getVertex(key) {
        return this.vertices.get(key);
    }

    colorize() {
        const colors = ["red", "green", "blue", "cyan", "magenta", "yellow"];
        let currentColor= 0;
        this.vertices.forEach((vertex) => {
            if(!vertex.visited) {
                this.depthTraversal(vertex, true, colors[currentColor++], null);
            }
        });
        this.resetVisits();
    }

    areConnected(key1, key2) {
        if(!this.getVertex(key1) || !this.getVertex(key2)) {
            return false;
        }
        return this.getVertex(key1).color === this.getVertex(key2).color;
    }

    resetVisits() {
        this.vertices.forEach(vertex => vertex.visited = false);
    }
}

const inputFile = readline.createInterface({
    input: fs.createReadStream('connections.txt'),
    output: process.stdout,
    terminal: false
});

const pairs = [];

inputFile.on('line', line => {
    const pair = line.split(',').map(key => key.trim());
    if(pair.length === 2) {
        pairs.push(pair);
    } else {
        console.log('not a proper pair:', line);
    }
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
        console.log(`${pair[0]} and ${pair[1]} are ${graph.areConnected(pair[0], pair[1]) ? '' : 'not '}connected`);
        inputReader.prompt();
    }).on('close', () => {
        console.log('so long !!!');
        process.exit(0);
    });

    inputReader.prompt();
});














