const fs = require('fs');
const path = require('path');

const description = 'Convert JSON file to CSV';

const command = (srcJsonPath, destCsvPath, options) => {

    if (!srcJsonPath || !destCsvPath || !options) {
        console.log('Must provide a json source path and destintion csv path')
        return
    }

    const json = require(srcJsonPath);

    if (!Array.isArray(json)) {
        console.log('The json file must be an array of objects');
        return
    }

    const flattenObject = (obj, data, prefix) => {
        for (let key in obj) {
            const val = obj[key];
            if (typeof val === 'object') {
                const p = `${prefix}${key}_`;
                flattenObject(val, data, p);
            } else {
                const k = `${prefix}${key}`;
                data[k] = val;
            }
        }
        return data;
    };

    const keys = Object.keys(flattenObject(json[0], {}, '')).join(',');
    const values = json.map(e => Object.values(flattenObject(e, {}, '')).join(',')).join('\n');

    const file = `${keys}\n${values}`;
    fs.writeFileSync(destCsvPath, file);

    console.log('Your json file was been converted to csv');
};

const documentation = () => {
    console.info(`
ctj jtc <SOURCE-PATH-to-JSON> <DESTINTION-PATH-to-CSV>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
