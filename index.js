const { Telegraf, Markup } = require('telegraf')
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const keepAlive = require("node-keepalive");
keepAlive();

const {
	gameOptions,
	againOptions,
	greet_message,
	start_game_invite,
	start_game_btn,
	winner_btn,
	correct_answer
} = require('./options');
//
const questions = require('./questions');

const {
	question_1,
	question_2,
	question_3,
	question_4,
	question_5,
	question_6,
	question_7,
	question_8,
	question_9,
	question_10,
	winner_message,
} = require('./questions');

bot.start( async (ctx) => {
	await ctx.replyWithSticker('https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp')
	await ctx.reply(greet_message)
	await ctx.reply(start_game_invite,
		Markup.inlineKeyboard([
			Markup.button.callback('поехали', 'Поехали'),
		]).oneTime())
})

bot.action('Поехали', async (ctx) => {
	await ctx.reply(question_1.question,
		Markup.keyboard([
			Markup.button.callback('padding', 'wrong'), Markup.button.callback('position', 'incorrect'), Markup.button.callback('margin', 'incorrect'),
		]).resize())
	ctx.answerCbQuery();
})

bot.hears(question_1.answer, async(ctx) => {
	console.log(ctx)
	await ctx.reply(correct_answer)
	await ctx.reply(question_2.question,
		Markup.keyboard([
			Markup.button.callback('Да', 'да'), Markup.button.callback('нет', 'ответ2'), Markup.button.callback('Не всегда', 'incorrect'),
		]).resize())
})

bot.hears(question_2.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_3.question,
		Markup.keyboard([
			Markup.button.callback('visibility', 'incorrect'), Markup.button.callback('display', 'incorrect'), Markup.button.callback('hide', 'ответ3'),
		]).resize())
})

bot.hears(question_3.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_4.question,
		Markup.keyboard([
			Markup.button.callback('<section>', 'incorrect'), Markup.button.callback('<aside>', 'incorrect'), Markup.button.callback('<main>', 'ответ4'),
		]).resize())
})

bot.hears(question_4.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_5.question,
		Markup.keyboard([
			Markup.button.callback('align-items', 'incorrect'), Markup.button.callback('justify-content', 'incorrect'), Markup.button.callback('оба по ситуации', 'ответ4'),
		]).resize())
})

bot.hears(question_5.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_6.question,
		Markup.keyboard([
			Markup.button.callback('да', 'incorrect'), Markup.button.callback('Нет', 'incorrect'), Markup.button.callback('не всегда', 'ответ4'),
		]).resize())
})

bot.hears(question_6.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_7.question,
		Markup.keyboard([
			Markup.button.callback('null', 'incorrect'), Markup.button.callback('undefined', 'incorrect'), Markup.button.callback('object', 'ответ4'),
		]).resize())
})

bot.hears(question_7.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_8.question,
		Markup.keyboard([
			Markup.button.callback('undefined', 'incorrect'), Markup.button.callback('bigInt', 'incorrect'), Markup.button.callback('char', 'ответ4'),
		]).resize())
})

bot.hears(question_8.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_9.question,
		Markup.keyboard([
			Markup.button.callback('True', 'incorrect'), Markup.button.callback('false', 'incorrect'), Markup.button.callback('[1, 2]', 'ответ4'),
		]).resize())
})

bot.hears(question_9.answer, async(ctx) => {
	await ctx.reply(correct_answer)
	await ctx.reply(question_10.question,
		Markup.keyboard([
			Markup.button.callback('False', 'incorrect'), Markup.button.callback('true', 'incorrect'), Markup.button.callback('undefined', 'ответ4'),
		]).resize())
})

bot.hears(question_10.answer, async(ctx) => {
	await ctx.reply(winner_message,
		Markup.inlineKeyboard([
			Markup.button.url('Получить приз!', 'www.google.com'),
		]).oneTime().resize())
	// ctx.answerCbQuery();
})

bot.on('callback_query', async (ctx) => {
	await console.log(ctx, 'CONTEXTTT!!!!');
})

bot.hears('incorrect', async(ctx) => {
	console.log('HEARS')
	await ctx.reply('Это неверно, подумай хорошенько')
	})

bot.action('incorrect', async(ctx) => {
	console.log('action')
	// console.log(ctx)
	await ctx.reply('Это неверно, подумай хорошенько')
	// const data = ctx.data;
	// 	const chatId = ctx.message.chat.id;
	//
	// 	if(data === 'incorrect') {
	// 		return 	ctx.reply('Это неверно, подумай хорошенько')
	// 	}
})


bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();



// bot.on('callback_query', (ctx) => {
//
// 	// Explicit usage
// 	// ctx.telegram.answerCbQuery(ctx.callbackQuery.id)
//
// 	// Using context shortcut
//
// 	console.log(ctx.message, "MESSAGE")
// 	// if(ctx.message.text === 'Поехали') {
// 	// 	console.log(1);
// 	// }
//
//
// 	// await ctx.reply(start_game_invite,
// 	// 	Markup.inlineKeyboard([
// 	// 		Markup.button.callback('Поехали', 'поехали'),
// 	// 	]))
// 	ctx.answerCbQuery()
// })


// const TelegramApi = require('node-telegram-bot-api');
// require('dotenv').config();
//
// const bot = new TelegramApi(process.env.BOT_TOKEN, {polling: true})
//
//
//
//
//
// const chats = {};
//
// const memoize = {};
//
//
// const startGame = async (chatId) => {
// 	await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты попробуй её отгадать')
// 	const randomNumber = Math.floor(Math.random() * 10);
// 	chats[chatId] = randomNumber;
// 	await bot.sendMessage(chatId, 'Отгадывай!', gameOptions);
// }
//
// const start = () => {
// 	bot.setMyCommands([
// 		{command: '/start', description: 'Начальное приветствие'},
// 		{command: '/info', description: 'Получить информацию о пользователе'},
// 		{command: '/game', description: 'Пройти тест'},
// 	])
//
// 	console.log(questions)
//
// 	bot.on('message', async msg => {
// 		const text = msg.text;
// 		const chatId = msg.chat.id;
//
// 		if( text === `/start`) {
// 			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp')
// 			await bot.sendMessage(chatId, greet_message)
// 			return bot.sendMessage(chatId, start_game_invite, start_game_btn)
// 		}
//
// 		if(text === `/info`) {
// 			return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.lastName || ''}`)
// 		}
//
// 		// if(text === '/game') {
// 		// 	return startGame(chatId);
// 		// }
//
// 		return bot.sendMessage(chatId, 'Извини, но я не знаю таких команд, попробуй ещё раз')
//
// 	})
//
// 	bot.on('callback_query', async msg => {
// 		const data = msg.data;
// 		const chatId = msg.message.chat.id;
//
// 		if(data === '/again') {
// 			return startGame(chatId);
// 		}
//
// 		if(data === 'поехали') {
// 			return await bot.sendMessage(chatId, question_1.question, question_1.options)
// 		}
//
//
//
//
// 		console.log(data)
//
//
// 		// if(data === question_1.answer) {
// 		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
// 		// 	return await bot.sendMessage(chatId, question_2.question, question_2.options)
// 		// }else if(data === question_2.answer) {
// 		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
// 		// 	return await bot.sendMessage(chatId, question_3.question, question_3.options)
// 		// }else if(data === question_3.answer) {
// 		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
// 		// 	return bot.sendMessage(chatId, question_4.question, question_4.options)
// 		// }else if(data === question_4.answer) {
// 		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
// 		// 	return await bot.sendMessage(chatId, winner_message, winner_btn.options);
// 		// }else {
// 		// 	return await bot.sendMessage(chatId, 'Неверный ответ, попроуй ещё раз');
// 		// }
//
// 		switch(data) {
// 			case question_1.answer:
// 				if(!memoize.question1) {
// 					console.log(1)
// 					console.log(memoize)
// 					memoize.question1 = true;
// 					await bot.sendMessage(chatId, 'Это правильный ответ!');
// 					return await bot.sendMessage(chatId, question_2.question, question_2.options)
// 				}
// 			case question_2.answer:
// 				console.log(2);
// 				console.log(data);
// 				console.log(question_2.answer);
// 				 await bot.sendMessage(chatId, 'Это правильный ответ!');
// 				return await bot.sendMessage(chatId, question_3.question, question_3.options)
// 			case question_3.answer:
// 				console.log(3)
// 				await bot.sendMessage(chatId, 'Это правильный ответ!');
// 				return bot.sendMessage(chatId, question_4.question, question_4.options)
// 			case question_4.answer:
// 				await bot.sendMessage(chatId, 'Это правильный ответ!');
// 				return await bot.sendMessage(chatId, winner_message, winner_btn.options);
//
// 			default:
// 				return await bot.sendMessage(chatId, 'Неверный ответ, попроуй ещё раз');
// 		}
//
// 		// if(data == question_1.answer) {
// 		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
// 		// 	return await bot.sendMessage(chatId, question_2.question, question_2.options)
// 		// } else if(data == question_2.answer) {
// 		// 	await bot.sendMessage(chatId, 'Это правильный ответ!');
// 		// }
// 		// else {
// 		// 	return await bot.sendMessage(chatId, 'Это неверный ответ, попроуй ещё раз');
// 		// }
//
// 		// if(data == chats[chatId]) {
// 		// 	return await bot.sendMessage(chatId, `Поздравляем, ты отгадал цифру ${chats[chatId]}`, againOptions)
// 		// } else {
// 		// 	return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
// 		// }
// 	})
// }
//
// start();