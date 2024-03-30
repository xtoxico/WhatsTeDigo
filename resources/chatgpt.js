require('dotenv').config();
const prompt = require('prompt-gpt')({
	model: 'gpt-3.5-turbo',
	apiKey: process.env.CHATGPTAPIKEY,
	rateLimit: 60,
	concurrency: 5,
	timeout: 5000,
});


async function AskToGpt(message,client) {
    let responseMessage = '';
    try {       
        prompt({
            message: message.body,    
            validate: function(response){
                //console.log(response);   
                return true;             
            },          
            parse: function(response){
                //console.log(response);
                return response;
            },          
            pass: function(response){
                //console.log(response);
                //responseMessage = response;
                client.sendMessage(message.from,response.message.content);
            },
            
        });
        
        await prompt.evaluate();
    } catch (error) {
        console.error(error);
        responseMessage = 'Lo siento pero ahora mismo no puedo atenderte. Por favor, inténtalo más tarde.';
        client.sendMessage(message.from,responseMessage);        
    }
    
}

module.exports = {
    AskToGpt: AskToGpt
}