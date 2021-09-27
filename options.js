module.exports = {
	 gameOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],// массив - строка
				[{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],// массив - строка
				[{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],// массив - строка
				[{text: '0', callback_data: '0'}],
			]
		})
	},
	 againOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Играть ещё раз', callback_data: '/again'}],
			]
		})
	},
	greet_message: 'Это приветственное сообщение от телеграм бота комании JusticeIt',
	start_game_invite: 'Мы приготовили для тебя игру и если ты сможешь её пройти, то получишь сюрприз! Готов начать?',
	start_game_btn: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Поехали!', callback_data: 'поехали'}],
			]
		})
	}
}