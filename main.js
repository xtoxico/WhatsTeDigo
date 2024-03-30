const { Client, LocalAuth  } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');
const fs = require('fs');
require('dotenv').config();


const configWhatsTeDigo = require('./resources/config.js');
const chatGpt = require('./resources/chatgpt.js');
const mynumber = process.env.MyPhoneNumber.toString() ;



async function sentMessage(message) {

    let users = await configWhatsTeDigo.listUserChatGpt();
    const allResponsesUsesGpt = await configWhatsTeDigo.allResponsesUsesGpt();
    console.log(users);
    //numberfrom hay que quitarle el 34 inicial y el @c.us final
    
    let numberfrom = message.from.replace('@c.us','');
    // quitar los dos primeros caracteres
    numberfrom = numberfrom.substring(2);
    numberfrom = parseInt(numberfrom);


    if (message.from === mynumber){        
        //si el mensaje empieza por adduser añadie el número de teléfono a la lista de usuarios
        if (message.body.startsWith('adduser')){
            let user = message.body.substring(8);            
            await configWhatsTeDigo.addUserChatGpt(user);
            SendConfig();
        }
        //si el mensaje empieza por deluser elimina el número de teléfono de la lista de usuarios
        if (message.body.startsWith('deluser')){
            let user = message.body.substring(8);           
            await configWhatsTeDigo.deleteUserChatGpt(user);
            SendConfig();
        }
        //si el mensaje empieza por list muestra la lista de usuarios
        if (message.body.startsWith('list')){           
            SendConfig();
        }

        //si el mensaje empieza por allresponsesgpt cambia el valor de allResponsesUsesGpt
        if (message.body.startsWith('allresponsesgpt')){
            let value = message.body.substring(16);
            await configWhatsTeDigo.setAllResponsesUsesGpt(value);
            SendConfig();
        }
    }

    if ((users.includes(message.from) || users.includes(numberfrom) || allResponsesUsesGpt) && message.from !== mynumber){
        chatGpt.AskToGpt(message,client);
    }
}

const client = new Client({
    authStrategy: new LocalAuth()
});

async function SendConfig(){

    client.sendMessage(mynumber,'*La configuración de la aplicación es la siguiente*');
    
    let users = await configWhatsTeDigo.listUserChatGpt();
    /*users.forEach(user => {
        client.sendMessage(mynumber,user.toString());
    });*/
    client.sendMessage(mynumber,'Listado de números de teléfono que pueden interactuar con el bot:' + JSON.stringify(users));
    let allResponsesUsesGpt = await configWhatsTeDigo.allResponsesUsesGpt();
    client.sendMessage(mynumber,'Todas las respuestas son generadas por GPT-3: ' + allResponsesUsesGpt);

    client.sendMessage(mynumber,'- Para añadir un número de teléfono a la lista de usuarios escriba *adduser* seguido del número de teléfono');
    client.sendMessage(mynumber,'- Para eliminar un número de teléfono de la lista de usuarios escriba *deluser* seguido del número de teléfono');
    client.sendMessage(mynumber,'- Para ver la lista de usuarios escriba *list*');
    client.sendMessage(mynumber,'- Para cambiar el valor de todas las respuestas generadas por GPT-3 escriba *allresponsesgpt* seguido de true o false');

    
    
}


client.on('ready', () => {
    console.log('Client is ready!');
    SendConfig();
});


client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});




client.on('qr', qr => {
    console.log(qr);
    qrcode.generate(qr, {small: true});    
});




client.on('message_create', message => {
    //console.log(message);
    sentMessage(message);
    


	//if (message.from === '34616591437@c.us' || message.from === '34647665497@c.us' || message.from === '34662096225@c.us') {}
});

client.initialize();


