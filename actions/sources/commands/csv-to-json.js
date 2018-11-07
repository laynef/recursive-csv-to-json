const fs = require('fs');
const path = require('path');

const description = 'Convert CSV file to JSON';

const command = (csvSrcPath, jsonDestPath, options) => {

    if (!csvSrcPath || !jsonDestPath || !options) {
        console.log('Must provide a csv source path and destintion json path')
        return
    }

    const csv = fs.readFileSync(csvSrcPath, { encoding: 'utf8' });
    const lines = csv.split('\n');
    const keys = lines[0].split(',');
    const rows = lines.slice(1);

    const json = rows.map(e => {
        const values = e.split(',');
        const object = {};
        values.forEach((val, idx) => {
            const key = keys[idx];
            object[key] = val;
        });
        return object;
    });

    fs.writeFileSync(jsonDestPath, json);
    console.log('Your csv has been converted to json.')
};

const documentation = () => {
    console.info(`
ctj csv-to-json <SOURCE-PATH-to-CSV> <DESTINTION-PATH-to-JSON>
ctj ctj <SOURCE-PATH-to-CSV> <DESTINTION-PATH-to-JSON>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
