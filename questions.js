module.exports = {
	question_1: {
		question: 'Вопрос 1',
		answer: '1',
		options: {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],// массив - строка
				]
			})
		}
	},
	question_2: {
		question: 'Вопрос 2',
		answer: '02',
		options: {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[{text: '1', callback_data: '01'}, {text: '2', callback_data: '02'}, {text: '3', callback_data: '03'}],// массив - строка
				]
			})
		}
	},
	question_3: {
		question: 'Вопрос 3',
		answer: '003',
		options: {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[{text: '1', callback_data: '001'}, {text: '2', callback_data: '002'}, {text: '3', callback_data: '003'}],// массив - строка
				]
			})
		}
	},
	question_4: {
		question: 'Вопрос 4',
		answer: '6',
		options: {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[{text: '1', callback_data: '4'}, {text: '2', callback_data: '5'}, {text: '3', callback_data: '6'}],// массив - строка
				]
			})
		}
	},
	winner_message: 'Молодец, ты правильно ответил на все вопросы! Переходи по этой ссылке и получай свой приз!!!' ,
}

// module.exports.questions = questions;