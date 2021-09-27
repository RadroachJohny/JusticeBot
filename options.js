nodule.exports = {
	 gameOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: '1', callback_data: 'data1'}, {text: '2', callback_data: 'data2'}, {text: '3', callback_data: 'data3'}],// массив - строка
				[{text: '4', callback_data: 'data4'}, {text: '5', callback_data: 'data5'}, {text: '6', callback_data: 'data6'}],// массив - строка
				[{text: '7', callback_data: 'data7'}, {text: '8', callback_data: 'data8'}, {text: '9', callback_data: 'data9'}],// массив - строка
				[{text: '0', callback_data: 'data0'}],
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
}