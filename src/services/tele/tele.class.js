import TelegramBot from 'node-telegram-bot-api';
const token = '6579805215:AAHutLZYfzmDZmAQpYoVdoAwCufdABPmi0k';
const options = {
  polling: true
};
const bot = new TelegramBot(token, options);  
let globalMessage;

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class TeleService {
  constructor(options) {
    this.options = options;
  }

  async find(_params) {
    return {
      globalMessage
    }
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    // cek isi data
    console.log(data);
    const { temperature, humidity, isExceeded } = data;


    globalMessage = `Temperature: ${temperature}\nHumidity: ${humidity}`;

// warning chat, chat id harus manual di set tiap orang, 
if (isExceeded) {
  const responseMessage = "Warning: Temperature or humidity has exceeded the limit!";
  bot.sendMessage(msg.chat.id, responseMessage)
    .then(sentMessage => {
      console.log('Warning message sent successfully:', sentMessage);
    })
    .catch(error => {
      console.error('Error sending warning message:', error);
    });
}



    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, _params) {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

//event handler ketika bot menerima pesan /getdata
bot.onText(/\/hello/, function onHello(msg) {
  console.log('Received /hello command.');

  const responseMessage = "Hi how are ya";

  if (msg.chat && msg.chat.id) {
    bot.sendMessage(msg.chat.id, responseMessage)
      .then(sentMessage => {
        console.log('Message sent successfully:', sentMessage);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  } else {
    console.warn('Invalid chat ID. Make sure msg.chat and msg.chat.id are defined.');
  }
});

bot.onText(/\/suhuruangan/, function onGetData(msg) {
  console.log('Received /suhuruangan command.');

 const errorMsg = "Error sending message"
 const warnMsg = "The Scanner is having a problem"

  if (msg.chat && msg.chat.id) {
    if (globalMessage && globalMessage.trim() !== '') {
      bot.sendMessage(msg.chat.id, globalMessage)
        .then(sentMessage => {
          console.log('Message sent successfully:', sentMessage);
        })
        .catch(error => {
          console.error('Error sending message:', error);
          bot.sendMessage(msg.chat.id, errorMsg)
        });
    } else {
      console.warn('globalMessage is empty. Ensure temperature and humidity have values.');
      bot.sendMessage(msg.chat.id, warnMsg)
    }
  } else {
    console.warn('Invalid chat ID. Make sure msg.chat and msg.chat.id are defined.');
  }
});

export const getOptions = (app) => {
  return { app }
}
