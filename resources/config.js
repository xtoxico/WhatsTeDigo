const { parse } = require('dotenv');
const redis = require('./redis.js');

async function listUserChatGpt(){
    let ConfigExists = await redis.exists('userChatGpt');
    let users = [];
    console.log(ConfigExists);
    
    if (!ConfigExists){
        //console.log('No existe la clave userChatGpt');
        await redis.set('userChatGpt',[]);
    }    
    //let users = [];*/
    users = await redis.get('userChatGpt');
    users = JSON.parse(users);
    return users;
}

async function addUserChatGpt(user){
    let users = await listUserChatGpt();
    user = parseInt(user);
    users.push(user);
    users = JSON.stringify(users);
    redis.set('userChatGpt',users);
}

async function deleteUserChatGpt(user){
    let users = await listUserChatGpt();
    user = parseInt(user);
    users = users.filter((u) => u !== user);
    users = JSON.stringify(users);
    redis.set('userChatGpt',users);
}

async function allResponsesUsesGpt(){
    let ConfigExists = await redis.exists('allResponsesUsesGpt');
    let responses = false;
    console.log(ConfigExists);
    
    if (!ConfigExists){
        //console.log('No existe la clave userChatGpt');
        await redis.set('allResponsesUsesGpt',"false");
    }    
    //let users = [];*/
    responses = await redis.get('allResponsesUsesGpt');
    responses = JSON.parse(responses);
    return responses;
}

async function setAllResponsesUsesGpt(value){
    await redis.set('allResponsesUsesGpt',value);
}  




module.exports = {
    listUserChatGpt: listUserChatGpt,
    addUserChatGpt: addUserChatGpt,
    deleteUserChatGpt: deleteUserChatGpt,
    allResponsesUsesGpt: allResponsesUsesGpt,
    setAllResponsesUsesGpt: setAllResponsesUsesGpt
}