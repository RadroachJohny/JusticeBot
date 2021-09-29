const { Telegraf, Markup } = require('telegraf')

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const keepAlive = require("node-keepalive");
keepAlive();

const {
	greet_message,
	start_game_invite,
	correct_answer,
	wrong_answer,
	winner_message,
} = require('./options');

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
} = require('./questions');

bot.start( async (ctx) => {
	console.log(ctx.chat.id, 'MESSAGE ID!!!')
	await ctx.replyWithSticker('CAACAgIAAxkBAAEC_ElhVDQx2RIEdvYMo-Hr6Qpo9IGuxQACQQ4AAr1HiEqMhOX5xEAG3CEE',
		Markup.removeKeyboard())
	await ctx.replyWithHTML(greet_message, 'extra message')
	await ctx.reply(start_game_invite,
		Markup.inlineKeyboard([
			Markup.button.callback('Пройти собеседование', 'Поехали'),
		]).oneTime())
})

bot.action('Поехали', async (ctx) => {
	const options = question_1.options;
	await ctx.reply(question_1.question,
		Markup.keyboard([
			Markup.button.callback(options[0], 'data'), Markup.button.callback(options[1], 'data'), Markup.button.callback(options[2], 'data'),
		]).resize())
	ctx.answerCbQuery();
})

bot.help((ctx) => ctx.reply('введите /start чтобы начать заново'))

const renderQuestions = async (question_prev, question_next ) => {
	bot.hears(question_prev.answer, async(ctx) => {
		const options = question_next.options;
		await ctx.reply(correct_answer)
		await ctx.reply(question_next.question,
			Markup.keyboard([
				[Markup.button.callback(options[0], 'data')], [Markup.button.callback(options[1], 'data')], [Markup.button.callback(options[2], 'data')],
			]).resize())
	})
}

renderQuestions(question_1, question_2);
renderQuestions(question_2, question_3);
renderQuestions(question_3, question_4);
renderQuestions(question_4, question_5);
renderQuestions(question_5, question_6);
renderQuestions(question_6, question_7);
renderQuestions(question_7, question_8);
renderQuestions(question_8, question_9);
renderQuestions(question_9, question_10);

bot.hears(question_10.answer, async(ctx) => {
	await ctx.replyWithHTML(winner_message,
		Markup.removeKeyboard())
})

bot.on('message', async(ctx) => {
	await ctx.reply(wrong_answer);
})

bot.launch();
