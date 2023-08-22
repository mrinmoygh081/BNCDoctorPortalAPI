/**
 * 
 * @param {Object} data 
 * @returns JSON
 * 
 * If you face any problem "Dont not how to serialize"
 * Just use that function tor resolve your problems
 * 
 */
const toJson = (data) => {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
}

module.exports = toJson;