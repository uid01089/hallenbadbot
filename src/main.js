"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const node_fetch_1 = __importDefault(require("node-fetch"));
//const TelegramBot = require('node-telegram-bot-api');
const token = '1238772013:AAGje0txoKp7AiF8BnhFFgxsXWs8nDLq808';
const massageId = '1360520014';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.sendMessage(massageId, "Hallenbad is watching by me");
bot.on('message', (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message:');
});
let htmlSide = "";
loop(htmlSide).then(response => console.log("finished"));
function diff(diffMe, diffBy) {
    return diffMe.split(diffBy).join('');
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function loop(htmlSide) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const response = yield node_fetch_1.default('https://termine.schwandorf.de/Hallenbad');
            const html = yield response.text();
            const cleanedHtml = html.replace(/\-\-.*?\-\-/g, "");
            if (htmlSide !== cleanedHtml) {
                htmlSide = cleanedHtml;
                bot.sendMessage(massageId, "Hallenbad was changed: https://termine.schwandorf.de/Hallenbad");
            }
            yield sleep(120000);
        }
    });
}
//# sourceMappingURL=main.js.map