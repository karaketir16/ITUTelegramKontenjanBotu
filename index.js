const rp = require("request-promise");

const TelegramBot = require('node-telegram-bot-api');

const token = 'SECRET TOKEN HERE';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Example usage: BLG/21622');
});

bot.on("polling_error", (err) => console.log(err));

bot.onText(/(.+)\/(.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "processing");

  const reqCrn = match[2];
  rp(`http://64.225.70.237/${match[1].toUpperCase()}/${match[2]}`)
    .then( function (data) {
      data = JSON.parse(data);
      console.log(Date(),data);
      let ans = "";
      if(data.hasOwnProperty("crn")){
          ans =  `Capacity: ${data.capacity}\n`;
          ans += `Enrolled: ${data.enrolled}\n`;
          ans +=  reqCrn;
      } 
      else  
        ans = "Not Found";
          bot.sendMessage(chatId, ans);
      }
  );
});

bot.onText(/(.+)/, (msg, match) => {
  console.log(match[1]);
  const chatId = msg.chat.id;
  if(match[1].indexOf("/") == -1)     
  bot.sendMessage(chatId, 'Example usage: BLG/21622');
});
