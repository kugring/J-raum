function client_add() {
	var client_list = document.querySelector('.client-list-container')
	var client_add_content = document.querySelector('.client-add-content')
	var client_add_notify = document.querySelector('.client-add-notify')
	var client_list_notify = document.querySelector('.client-list-notify')

	client_list.style.display = 'none'
	client_list_notify.style.display = 'none'
	client_add_content.style.display = 'flex'
	client_add_notify.style.display = 'flex'
}

function client_add_cancel() {
	var client_list = document.querySelector('.client-list-container')
	var client_add_content = document.querySelector('.client-add-content')
	var client_add_notify = document.querySelector('.client-add-notify')
	var client_list_notify = document.querySelector('.client-list-notify')

	client_list.style.display = 'flex'
	client_list_notify.style.display = 'flex'
	client_add_content.style.display = 'none'
	client_add_notify.style.display = 'none'
}

function updateClient(button) {
	var row = button.parentNode.parentNode;
	var client_id = row.querySelector('.client-id').textContent;
	var position = row.querySelector('.client-position').value;
	var client_name = row.querySelector('.client-name').value;
	var phone_number = row.querySelector('.phone-number').value;

	console.log(client_id, position, client_name, phone_number)
	$.ajax({
		url: '/ClientUpdate/',
		type: 'POST',
		data: {
			client_id: client_id,
			position: position,
			client_name: client_name,
			phone_number: phone_number,
		},
		success: function (response) {
			// 업데이트 성공 시 처리할 코드
			console.log('클라이언트의 정보가 수정되었습니다.');
			window.location.href = "/Client_list/";
		},
		error: function (xhr, status, error) {
			// 오류 발생 시 처리할 코드
			console.error('메뉴 업데이트 중 오류가 발생했습니다:', error);
		}
	});
}

function submitForm() {
	var client_list_content = document.querySelector('.client-list-content')
	var client_list = document.querySelector('.client-list-container')
	var client_add_content = document.querySelector('.client-add-content')
	var client_add_notify = document.querySelector('.client-add-notify')
	var client_list_notify = document.querySelector('.client-list-notify')
	var client_add_complete = document.querySelector('.client-add-complete')
	var position = document.getElementById("position").value;
	var name = document.getElementById("name").value;
	var point = document.getElementById("point").value;
	var password = document.getElementById("password").value;

	// 수집한 데이터 출력
	console.log("name:", name);
	console.log("position:", position);
	console.log("point", point);
	console.log("phone_number:", password);
	if (position && point && password) {

		$.ajax({
			url: '/ClientAppend/', // 데이터를 업데이트하는 뷰의 URL
			type: 'POST',
			data: {
				name: name,
				position: position,
				point: point,
				phone_number: password
			},
			success: function (response) {
				// 업데이트가 성공한 경우 처리할 내용
				console.log('데이터가 업데이트되었습니다.');
				client_list_content.classList.add('hidden')

				setTimeout(function () {
					client_list_content.classList.remove('hidden')
					client_add_content.style.display = 'none'
					client_add_notify.style.display = 'none'
					client_add_complete.style.display = 'flex'
				}, 300)

				setTimeout(function () {
					client_list_content.classList.add('hidden')
					client_add_complete.style.display = 'none'
				}, 1000)

				setTimeout(function () {
					client_list_content.classList.remove('hidden')
					client_list.style.display = 'flex'
					client_list_notify.style.display = 'flex'
					window.location.href = "/Client_list/";
				}, 1400)
			},
			error: function (xhr, status, error) {
				// 오류가 발생한 경우 처리할 내용
				console.error('데이터 업데이트 중 오류가 발생했습니다:', error);
			}
		});
	}
}