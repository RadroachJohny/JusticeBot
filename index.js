const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '2035541267:AAEBxfKJPrelaM-HwhRJZ1eMlXZ1RU-mbBA';

const bot = new TelegramApi(token, {polling: true})

const chats = {};

const startGame = async (chatId) => {
	await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты попробуй её отгадать')
	const randomNumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomNumber;
	await bot.sendMessage(chatId, 'Отгадывай!', gameOptions);
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Начальное приветствие'},
		{command: '/info', description: 'Получить информацию о пользователе'},
		{command: '/game', description: 'Игра угадай цифру'},
	])

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if( text === `/start`) {
			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp')
			return bot.sendMessage(chatId, `Добро пожаловать в Telegram канал компании JusticeIt`)
		}
		if(text === `/info`) {
			return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.lastName || ''}`)
		}

		if(text === '/game') {
			return startGame(chatId);
		}

		return bot.sendMessage(chatId, 'Извини, но я не знаю таких команд, попробуй ещё раз')

	})

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if(data === '/again') {
			return startGame(chatId);
		}

		if(data === chats[chatId]) {
			return await bot.sendMessage(chatId, `Поздравляем, ты отгадал цифру ${chats[chatId]}`, againOptions)
		} else {
			return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал фицру ${chats[chatId]}`, againOptions)
		}
	})
}

start();