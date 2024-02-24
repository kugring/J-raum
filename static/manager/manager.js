document.addEventListener('DOMContentLoaded', function () {

	$.ajax({
		url: '/ManagerOrderData/',
		method: 'GET',
		success: function (order_list_values) {
			// 성공적으로 응답을 받은 경우, response 변수에 JSON 데이터가 포함됩니다.
			console.log(order_list_values[0]); // 응답 데이터를 콘솔에 출력합니다.

			for (let i = 0; i < order_list_values.length; i++) {
				const order_waiting_container = document.querySelector('.order-waiting-container')
				const order_waiting_box = document.createElement('div');
				const order_waiting_item = document.createElement('div');
				const client_name = document.createElement('div');
				const order_icon = document.createElement('div');
				const order_id = document.createElement('div');

				order_waiting_box.className = 'order-waiting-box'
				order_waiting_item.className = 'order-waiting-item'
				client_name.className = 'client-name'
				order_icon.className = 'order-icon'
				order_id.className = 'order-id'

				order_waiting_container.appendChild(order_waiting_box)
				order_waiting_box.appendChild(order_waiting_item)
				order_waiting_item.appendChild(order_id)
				order_waiting_item.appendChild(order_icon)
				order_waiting_item.appendChild(client_name)
				order_waiting_item.onclick = function () {
					orderListCheck(this);
				};
				// 주문의 id
				order_id.innerText = order_list_values[i].id

				// 주문자의 이름
				if (order_list_values[i].order_name.match(/\d+/g) > 0) {
					client_name.innerText = 'No. ' + order_list_values[i].order_name
				} else {
					client_name.innerText = order_list_values[i].order_name
				}

				// 아이콘과 수량 체크하기
				const menu_list = order_list_values[i].order_menu.split(',')
				let hot = 0
				let cold = 0
				for (let i = 0; i < menu_list.length; i++) {
					// 수량[2,3] id[4,5], deg[6], shot_num[7], add_shot[8], hot[9], cold[10], sugar[11], vanilla[12], caramel[13], iceCream[14]
					var menu_quantity =  parseInt(menu_list[i].substring(2, 4), 10)
					console.log(menu_quantity)
					// { hot: 0 / cold: 1 } 6번째가 온도 관련 문자
					if (menu_list[i][6] === '0') {
						hot += menu_quantity
					} else {
						cold += menu_quantity
					}
				}
				// 컵 종류 분리하기
				order_icon.innerText = '🔥' + hot + '   🧊' + cold
			}


			// 대기의 첫번째 주문
			const first_order_list = order_list_values[0].order_menu.split(',')

			// 오더 id값 넣기
			const order_menu_body = document.querySelector('.order-menu-body')
			const order_id = document.createElement('div');
			order_id.className = 'order-id'
			order_menu_body.appendChild(order_id)
			order_id.innerText = order_list_values[0].id

			for (let i = 0; i < first_order_list.length; i++) {

				// 아래 하단에 메뉴 리스트 넣기
				const order_menu_box = document.createElement('div');
				const menu_left = document.createElement('div');
				const menu_name = document.createElement('div');
				const menu_options = document.createElement('div');
				const menu_option = document.createElement('div');
				const menu_right = document.createElement('div');
				const menu_img = document.createElement('img');
				const menu_quantity = document.createElement('div');

				order_menu_box.className = 'order-menu-box'
				menu_left.className = 'menu-left'
				menu_name.className = 'menu-menu-name'
				menu_options.className = 'menu-options'
				menu_option.className = 'menu-option'
				menu_right.className = 'menu-right'
				menu_img.className = 'menu-img'
				menu_quantity.className = 'menu-quantity'

				order_menu_body.appendChild(order_menu_box)
				order_menu_box.appendChild(menu_left)
				menu_left.appendChild(menu_name)
				menu_left.appendChild(menu_options)
				order_menu_box.appendChild(menu_right)
				menu_right.appendChild(menu_img)
				menu_right.appendChild(menu_quantity)

				// 클릭시 어두워지는 코드
				order_menu_box.onclick = function () {
					toggleDarken(this)
				};

				// { hot:0 / cold: 1 }
				// 수량[2,3] id[4,5], deg[6], shot_num[7], add_shot[8], hot[9], cold[10], sugar[11], vanilla[12], caramel[13], iceCream[14]

				// 수량 넣기
				menu_quantity.innerText = parseInt(first_order_list[i].substring(2, 4), 10) + ' 잔'
				console.log(parseInt(first_order_list[i].substring(2, 4), 10))

				// 옵션 창에 넣음 (* 오류 주의: 숫자가 아닌 텍스트이다. *)
				if (first_order_list[i][6] === '0') {
					// 1인 경우가 덜-뜨겁게 이다.
					if (first_order_list[i][9] === '1') {
						menu_option.innerText = '덜-뜨겁게'
					} else {
						menu_option.innerText = '뜨겁게'
					}
				} else {
					menu_option.style.backgroundColor = '#6474b0'
					if (first_order_list[i][10] === '1') {
						menu_option.innerText = '얼음-적게'
					} else {
						menu_option.innerText = '차갑게'
					}
				}
				menu_options.appendChild(menu_option)


				const menu_id = first_order_list[i].substring(4, 6);
				console.log(menu_id)

				$.ajax({
					url: '/ManagerMenuList/',
					data: JSON.stringify({
						selected_id: menu_id,
					}),
					method: "POST",
					contentType: "application/json",  // 추가: JSON 데이터를 전송함을 명시
					success: function (data) {
						const menu = data.menu_list[0]

						// 메뉴 이름 넣기
						menu_name.innerText = menu.name
						// 메뉴 이미지 넣기
						menu_img.src = menu.img
					},
					error: function (error) {
						console.log('전송 중 오류가 발생했습니다.');
					}
				});
			}
		},
		error: function (xhr, status, error) {
			// 요청이 실패한 경우, 에러를 처리할 수 있습니다.
			console.error(error);
		}
	});
});

function orderListCheck(element) {
	// 선택한 헤더의 아이디 가져오기
	var selected_order_id = element.querySelector('.order-id').textContent
	// 하단의 메뉴리스트 초기화 하기
	const order_menu_body = document.querySelector('.order-menu-body')
	order_menu_body.innerText = ''
	// 총 수량 표기
	const order_total_quantity = document.querySelector('.order-total-quantity')


	$.ajax({
		url: '/ManagerMenuList/',
		data: JSON.stringify({
			order_id: selected_order_id,
		}),
		method: "POST",
		contentType: "application/json",  // 추가: JSON 데이터를 전송함을 명시
		success: function (data) {


			// 선택한 주문
			var order_list = data.order_list[0].order_menu.split(',')

			// 오더 id값 넣기
			const order_menu_body = document.querySelector('.order-menu-body')
			const order_id = document.createElement('div');
			order_id.className = 'order-id'
			order_menu_body.appendChild(order_id)
			order_id.innerText = selected_order_id

			// 메뉴 총 수량
			let total_quantity = 0


			for (let i = 0; i < order_list.length; i++) {

				// 아래 하단에 메뉴 리스트 넣기
				const order_menu_box = document.createElement('div');
				const menu_left = document.createElement('div');
				const menu_name = document.createElement('div');
				const menu_options = document.createElement('div');
				const menu_option = document.createElement('div');
				const menu_right = document.createElement('div');
				const menu_img = document.createElement('img');
				const menu_quantity = document.createElement('div');

				order_menu_box.className = 'order-menu-box'
				menu_left.className = 'menu-left'
				menu_name.className = 'menu-menu-name'
				menu_options.className = 'menu-options'
				menu_option.className = 'menu-option'
				menu_right.className = 'menu-right'
				menu_img.className = 'menu-img'
				menu_quantity.className = 'menu-quantity'

				order_menu_body.appendChild(order_menu_box)
				order_menu_box.appendChild(menu_left)
				menu_left.appendChild(menu_name)
				menu_left.appendChild(menu_options)
				order_menu_box.appendChild(menu_right)
				menu_right.appendChild(menu_img)
				menu_right.appendChild(menu_quantity)

				// 클릭시 어두워지는 코드
				order_menu_box.onclick = function () {
					toggleDarken(this)
				};
				// { hot:0 / cold: 1 }
				// 수량[2,3] id[4,5], deg[6], shot_num[7], add_shot[8], hot[9], cold[10], sugar[11], vanilla[12], caramel[13], iceCream[14]

				// 수량 넣기
				menu_quantity.innerText = parseInt(order_list[i].substring(2, 4), 10) + ' 잔'

				// 총 수량 합계 구하기
				total_quantity += parseInt(order_list[i].substring(2, 4), 10)

				// 옵션 창에 넣음 (* 오류 주의: 숫자가 아닌 텍스트이다. *)
				if
				(order_list[i][6] === '0') {
					// 1인 경우가 덜-뜨겁게 이다.
					if (order_list[i][9] === '1') {
						menu_option.innerText = '덜-뜨겁게'
					} else {
						menu_option.innerText = '뜨겁게'
					}
				} else {
					menu_option.style.backgroundColor = '#6474b0'
					if (order_list[i][10] === '1') {
						menu_option.innerText = '얼음-적게'
					} else {
						menu_option.innerText = '차갑게'
					}
				}
				menu_options.appendChild(menu_option)


				const menu_id = order_list[i].substring(4, 6);
				console.log(menu_id)

				$.ajax({
					url: '/ManagerMenuList/',
					data: JSON.stringify({
						selected_id: menu_id,
					}),
					method: "POST",
					contentType: "application/json",  // 추가: JSON 데이터를 전송함을 명시
					success: function (data) {
						const menu = data.menu_list[0]

						// 메뉴 이름 넣기
						menu_name.innerText = menu.name
						// 메뉴 이미지 넣기
						menu_img.src = menu.img
					},
					error: function (error) {
						console.log('전송 중 오류가 발생했습니다.');
					}
				});
			}
			order_total_quantity.innerText = '총: ' + total_quantity + '잔'

		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});
}

function toggleDarken(element) {
	element.classList.toggle('clicked');
}

function orderComplete() {
	const order_waiting_num = document.querySelector('.order-waiting-num')
	const order_waiting_container = document.querySelector('.order-waiting-container')
	const order_menu_body = document.querySelector('.order-menu-body')
	// 총 수량 표기
	const order_total_quantity = document.querySelector('.order-total-quantity')
	// 주문 id 가져오기
	var order_id = order_menu_body.querySelector('.order-id').textContent
	// 대기숫자 갱신하기
	var renew_waiting_num = order_waiting_num.textContent.match(/\d+/g)[0] - 1
	console.log(renew_waiting_num)
	order_waiting_num.innerText = '대기주문: ' + renew_waiting_num

	console.log(order_id)
	$.ajax({
		url: '/ManagerMenuList/',
		data: JSON.stringify({
			completed_id: order_id,
		}),
		method: "POST",
		contentType: "application/json",  // 추가: JSON 데이터를 전송함을 명시
		success: function (data) {
		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});
	// .order-waiting-container의 두 번째 자식 요소를 선택합니다.


	// 다음 주문을 요소를 클릭합니다.
	try {
		var next_order = order_waiting_container.children[1].children[0];
		if (next_order) {
			next_order.click();
		} else {
			console.error('클릭할 다음 주문 요소를 찾을 수 없습니다.');
		}
	} catch (error) {
		// 마지막 주문이 더이상 없는 경우 목록을 지워버림
		order_menu_body.innerText = ''
		order_total_quantity.innerText = ''
	}

	var complete_order = order_waiting_container.children[0];
	complete_order.remove();
}