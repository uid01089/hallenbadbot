import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import { Credential } from '../credential';

//const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(Credential.token, { polling: true });

bot.sendMessage(Credential.massageId, "Hallenbad is watching by me");


bot.on('message', (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message:');
});


const htmlSide = "";


loop(htmlSide).then(() => console.log("finished"));




function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop(htmlSide: string): Promise<void> {
    while (true) {

        const response = await fetch('https://termine.schwandorf.de/Hallenbad');
        const html = await response.text();
        const cleanedHtml = html.replace(/\-\-.*?\-\-/g, "");


        if (htmlSide !== cleanedHtml) {
            htmlSide = cleanedHtml;
            bot.sendMessage(Credential.massageId, "Hallenbad was changed: https://termine.schwandorf.de/Hallenbad");

        }

        await sleep(120000);
    }





}





