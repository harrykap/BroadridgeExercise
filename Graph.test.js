import Graph from './Graph.js';

const pairs = [
    ['Portland', 'Manchester'],
    ['Manchester', 'Boston'],
    ['Boston', 'New York'],
    ['New York', 'Baltimore'],
    ['San Diego', 'Los Angeles'],
    ['Los Angeles', 'San Francisco'],
    ['San Francisco', 'Seattle']
];

let graph;

beforeAll(() => {graph = new Graph(pairs)});

test('East coast city connected to East coast city', () => {
    const connected = graph.areConnected(['Boston', 'Baltimore']);
    expect(connected).toBe(true);
})

test('West coast city connected to West coast city', () => {
    const connected = graph.areConnected(['Los Angeles', 'Seattle']);
    expect(connected).toBe(true);
})

test('East coast city not connected to West coast city', () => {
    const connected = graph.areConnected(['Boston', 'Los Angeles']);
    expect(connected).toBe(false);
})