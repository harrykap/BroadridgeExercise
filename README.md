# BroadridgeExercise

Builds an undirected graph from comma delimited pairs contained in the file 'connections.txt' then determines if specific pairs, input via the console, are connected

## Notes

Developed and tested in Node v18.7.0.   Unit tests might not work in lower versions, especially those below v14.13.1

## Installing

Clone the repository and change to the working directory
Run **npm install**;

## Running application from command line

In the working directory, run: **'node connections.js'**

## Supplying connection data

Connection data is in the file **connections.txt** as comma-delimited pairs separated by newlines

## Running unit tests

In the working directory, run **node --experimental-vm-modules node_modules/jest/bin/jest.js** (necessary to get around issues with ES Modules)





