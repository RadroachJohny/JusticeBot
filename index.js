const TelegramApi = require('node-telegram-bot-api');

const token = '2035541267:AAEBxfKJPrelaM-HwhRJZ1eMlXZ1RU-mbBA';

const bot = new TelegramApi(token, {polling: true})

const {
	gameOptions,
	againOptions,
	greet_message,
	start_game_invite,
	start_game_btn
} = require('./options');

const questions = require('./questions');

const {
	question_1,
	question_2,
	question_3,
	question_4,
	winner_message
} = require('./questions');



const chats = {};

const memoize = {};


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
		{command: '/game', description: 'Пройти тест'},
	])

	console.log(questions)

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if( text === `/start`) {
			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp')
			await bot.sendMessage(chatId, greet_message)
			return bot.sendMessage(chatId, start_game_invite, start_game_btn)
		}

		if(text === `/info`) {
			return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.lastName || ''}`)
		}

		// if(text === '/game') {
		// 	return startGame(chatId);
		// }

		return bot.sendMessage(chatId, 'Извини, но я не знаю таких команд, попробуй ещё раз')

	})

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if(data === '/again') {
			return startGame(chatId);
		}

		if(data === 'поехали') {
			return await bot.sendMessage(chatId, question_1.question, question_1.options)
		}


		switch(data) {
			case question_1.answer:
				console.log(1)
				 await bot.sendMessage(chatId, 'Это правильный ответ!');
				 return await bot.sendMessage(chatId, question_2.question, question_2.options)
			case question_2.answer:
				console.log(2)
				 await bot.sendMessage(chatId, 'Это правильный ответ!');
				return await bot.sendMessage(chatId, question_3.question, question_3.options)
			case question_3.answer:
				console.log(3)
				await bot.sendMessage(chatId, 'Это правильный ответ!');
				return bot.sendMessage(chatId, question_4.question, question_4.options)
			case question_4.answer:
				await bot.sendMessage(chatId, 'Это правильный ответ!');
				return await bot.sendMessage(chatId, winner_message);

			default:
				return await bot.sendMessage(chatId, 'Неверный ответ, попроуй ещё раз');
		}

		// if(data == question_1.answer) {
		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
		// 	return await bot.sendMessage(chatId, question_2.question, question_2.options)
		// } else if(data == question_2.answer) {
		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
		// }
		// else {
		// 	return await bot.sendMessage(chatId, 'Это неверный ответ, попроуй ещё раз');
		// }

		// if(data == chats[chatId]) {
		// 	return await bot.sendMessage(chatId, `Поздравляем, ты отгадал цифру ${chats[chatId]}`, againOptions)
		// } else {
		// 	return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
		// }
	})
}

start();