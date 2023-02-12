const TelegramBot = require("node-telegram-bot-api");
const { voices } = require("./voices");
require("dotenv").config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
console.log("test");
bot.on("inline_query", async (msg) => {
  await bot.answerInlineQuery(
    msg.id,
    voices.filter(
      (v) => !!v.title.toLowerCase().includes(msg.query.toLowerCase())
    )
  );
});

bot.on("message", async (msg) => {
  await bot.sendVoice(
    msg.chat.id,
    voices[Math.floor(Math.random() * voices.length)].voice_url
  );
});
