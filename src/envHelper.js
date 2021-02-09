/**
 * this module contains functions to work with environment variables
 */

function getValueOrThrow(envVariable) {
    const value = process.env[envVariable];

    if (value === undefined) {
        throw new Error(`variable ${envVariable} is not set`);
    }

    return value;
}

module.exports = {
    getValueOrThrow,
};
