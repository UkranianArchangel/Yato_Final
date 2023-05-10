import { Telegraf } from 'telegraf';
import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/svg', express.static(path.join(__dirname, 'svg')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'scripts.js')));

app.use('/style', express.static(path.join(__dirname, 'style')));

// TELEGRAM BOT API START
const bot = new Telegraf('6106235552:AAF4tgp9gRVquOYq_GGMfWElpIBkwtNNCMA')

bot.start((ctx) => {
  ctx.reply('Слава Україні!')
})

bot.on('text', (ctx) => {
  ctx.reply('Не потрібно в мене нічого писати, бо мене нічому не навчили.')
})

bot.on('callback_query', (ctx) => {
  ctx.reply('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.')
})

bot.launch();
// TELEGRAM BOT API END

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/form', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const product = req.body.product;

  const message = `Нове замовлення  Имʼя: ${name}\nТелефон: ${phone}\nЗамовляє: ${product}`

  bot.telegram.sendMessage('5139232876', message);
  res.sendFile(path.join(__dirname, 'form-success.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});