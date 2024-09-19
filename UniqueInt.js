const fs = require('fs');
const path = require('path');

// Constants to define the valid range of integers
const MIN_INTEGER = -1023;
const MAX_INTEGER = 1023;
const TOTAL_RANGE = MAX_INTEGER - MIN_INTEGER + 1;

// Helper function to check if a string can be interpreted as a valid integer
function isInteger(str) {
    return /^-?\d+$/.test(str); // Matches an optional negative sign followed by digits
}

// Main function to process the input file and generate a filtered, sorted output
function processFile(inputFilePath, outputFilePath) {
    console.log(`Processing file: ${inputFilePath}`); // Debugging: log the input file being processed
    fs.readFile(inputFilePath, 'utf8', (error, fileContent) => {
        if (error) {
            console.error(`Failed to read the input file: ${error.message}`);
            return;
        }
        console.log('File read successfully. Processing content...'); // Debugging: confirm successful read
        
        const uniqueNumbers = new Set(); // To store unique valid integers
        const isNumberSeen = new Array(TOTAL_RANGE).fill(false); // Track whether a number has been seen

        // Split file content by lines and process each line
        fileContent.split('\n').forEach(line => {
            const cleanedLine = line.trim(); // Remove any leading/trailing spaces
            if (!cleanedLine || cleanedLine.split(/\s+/).length !== 1) return; // Skip empty or invalid lines

            // If the line contains a valid integer, proceed
            if (isInteger(cleanedLine)) {
                const number = parseInt(cleanedLine, 10); // Convert the line to an integer
                const indexInRange = number - MIN_INTEGER; // Adjust for zero-based array index

                // Add to the set if it's within range and hasn't been encountered before
                if (number >= MIN_INTEGER && number <= MAX_INTEGER && !isNumberSeen[indexInRange]) {
                    uniqueNumbers.add(number);
                    isNumberSeen[indexInRange] = true;
                }
            }
        });

        // Sort the unique integers
        const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
        console.log(`Sorted unique numbers: ${sortedNumbers}`); // Debugging: log sorted numbers

        // Write the sorted integers to the output file
        fs.writeFile(outputFilePath, sortedNumbers.join('\n') + '\n', writeError => {
            if (writeError) {
                console.error(`Failed to write to the output file: ${writeError.message}`);
            } else {
                console.log(`Output written to: ${outputFilePath}`); // Debugging: confirm successful write
            }
        });
    });
}

// Example usage with sample file paths
const inputFilePath = '/Users/nigel/Documents/UniqueInt/sample_inputs/sample_01.txt';
const outputFilePath = '/Users/nigel/Documents/UniqueInt/sample_results/sample_01.txt_results.txt';

// Process the input file and generate the output
processFile(inputFilePath, outputFilePath);

