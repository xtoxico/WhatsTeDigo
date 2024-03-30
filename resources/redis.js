//usaremos redis para almacenar toda la gestión de la app
const Redis = require ('redis');
const { promisify } = require("util");

const client = Redis.createClient(); 
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const existsAsync = promisify(client.exists).bind(client);




async function set (key, value) {
    await setAsync(key, value);
}

async function get (key) {
    return await getAsync(key);
}

async function del (key) {
    await delAsync(key);
}

async function exists (key) {
    return await existsAsync(key);
}


module.exports = {


    set: set,
    get: get,
    del: del,
    exists: exists

}