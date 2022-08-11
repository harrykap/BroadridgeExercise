export default class Graph {
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

    connect(keys) {
        this.vertices.get(keys[0]).adjacent.push(keys[1]);
        this.vertices.get(keys[1]).adjacent.push(keys[0]);
    }

    depthTraversal(vertex, colorize= false, color = null, postRecursionCallback = null, preRecursionCallback = null) {
        vertex.visited = true;
        if(colorize) {
            vertex.color = color;
        }
        vertex.adjacent.forEach(key => {
            const vertex = this.vertices.get(key);
            if (!vertex.visited) {
                this.depthTraversal(vertex, colorize, color, postRecursionCallback, preRecursionCallback);
            }
        });
        if(postRecursionCallback) {
            postRecursionCallbackcallback(vertex);
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

    areConnected(keys) {
        const key0 = keys[0], key1 = keys[1];

        if(!this.getVertex(key0) || !this.getVertex(key1)) {
            return undefined;
        }
        return this.getVertex(key0).color === this.getVertex(key1).color;
    }

    resetVisits() {
        this.vertices.forEach(vertex => vertex.visited = false);
    }
};