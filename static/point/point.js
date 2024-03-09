let currentDigit = 1;

function appendNumber(number) {
	const digitInput = document.getElementById(`digit${currentDigit}`);
	digitInput.innerText = number;
	currentDigit = (currentDigit % 4) + 1;
	checkAndSubmit();
}

function clearManagerNumber() {
	for (let i = 1; i <= 4; i++) {
		const digitInput = document.getElementById(`digit${i}`);
		digitInput.innerText = '';
	}
	currentDigit = 1;
}

function removeNumber() {
	currentDigit = (currentDigit - 2 + 4) % 4 + 1;
	const digitInput = document.getElementById(`digit${currentDigit}`);
	digitInput.innerText = '';
	checkAndSubmit();
}

function checkAndSubmit() {
	const managerNumberInputs = Array.from({length: 4}, (_, i) => document.getElementById(`digit${i + 1}`).innerText);
	const hasValue = managerNumberInputs.some(value => value.trim() !== '');
	const submitButton = document.getElementById('submitBtn');
	if (submitButton) {
		submitButton.disabled = !hasValue;
	}
	if (hasValue && currentDigit === 1) {
		const managerNumber = managerNumberInputs.join('');
		searchManagerNumber(managerNumber);
	}
	if (managerNumberInputs.every(value => value.trim() !== '')) {
		setTimeout(() => {
			clearManagerNumber();
		}, 500);
	}
}

function searchManagerNumber(managerNumber) {
	fetch(`/api/Manger_number_search/?manager_number=${managerNumber}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {

			// 숫자 자판이 위로 올라가며 사라지는 코드 짜는중
			var resultContainer = document.querySelector('#result-container');
			var point_body = document.querySelector('.point-body');
			var number_board = document.querySelector('.number-board');
			var point_board = document.querySelector('.point-board');
			var manager_name = document.querySelector('.manager-name');
			var point_body_select = document.querySelector('.point-body-select');


			// 'result' 키가 있는지 확인
			if ('result' in data && data.result !== 'null') {

				// 숫자 자판이 위로 올라는 코드
				point_body.classList.add('hidden');

				setTimeout(function () {
					point_body.classList.remove('hidden');
					number_board.style.display = 'none'
					point_board.style.display = 'flex'
					point_body_select.style.display = 'flex'
					manager_name.innerText = data.result
				}, 500)

			}
			// 'result' 키가 없거나 값이 'null'이면 모든 요소박스를 비워줍니다
			else {
				resultContainer.style.opacity = 0;
				setTimeout(function () {
					resultContainer.innerText = '다시 시도해주세요!^^';
					resultContainer.style.opacity = 1;
				}, 300)
				setTimeout(function () {
					resultContainer.style.opacity = 0;
				}, 1200)
				setTimeout(function () {
					resultContainer.innerText = '* 초기번호: 전화번호 뒷자리 *';
					resultContainer.style.opacity = 1;
				}, 1500)
			}
		});
}

function point_yes(element) {
	var request_box = element.parentNode.parentNode
	var charge_num = request_box.querySelector('.point-charge-num').textContent.replace(/,/g, '').match(/\d+/g)[0];
	var created_at = request_box.querySelector('.point-origin-date').textContent
	var point_password = request_box.querySelector('.point-password').textContent
	var point_id = request_box.querySelector('.point-id').textContent
	var client_name = request_box.querySelector('.point-client-name').textContent
	var manager_name = document.querySelector('.manager-name').textContent
	var originalPoint = request_box.querySelector('.point-currentpointofclientbuthidden').textContent.replace(/,/g, '').match(/\d+/g)[0];

	var finalPoint = Number(originalPoint) + Number(charge_num)

	console.log(charge_num, created_at, point_password, client_name)
	console.log('잔액이 ' + originalPoint + '원 남은 ' + client_name + '고객님의 ' + charge_num + '원 충전을 승인하였습니다.')
	console.log('충전 이후 잔액은 ' + finalPoint + '입니다.')

	let fd_point = new FormData();

	fd_point.append('push_point', charge_num);
	fd_point.append('created_at', created_at);
	fd_point.append('client_name', client_name)
	fd_point.append('point_password', point_password);
	fd_point.append('point_id', point_id);
	fd_point.append('manager_name', manager_name);
	fd_point.delete('current_point');
	fd_point.append('current_point', finalPoint);

	$.ajax({
		url: '/ManagerCheck/',
		data: fd_point,
		method: "POST",
		processData: false,
		contentType: false,
		success: function (data) {
			console.log('일단 데이터를 전송하긴함.');
		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});
}

function point_no(element) {
	var request_box = element.parentNode.parentNode
	var point_id = request_box.querySelector('.point-id').textContent
	let fd_point = new FormData();
	fd_point.append('point_id', point_id);

	$.ajax({
		url: '/ManagerDelete/',
		data: fd_point,
		method: "POST",
		processData: false,
		contentType: false,
		success: function (data) {
			console.log('일단 데이터를 전송하긴함.');
		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});
}

function div_delete(element) {
	var request_box = element.parentNode.parentNode
	request_box.remove()
}

function flex_point_border() {
	var point_board = document.querySelector('.point-board')
	var detail_list = document.querySelector('.point-detail-list')
	point_board.style.display = 'flex'
	detail_list.style.display = 'none'
}

function flex_detail_list() {
	var point_board = document.querySelector('.point-board')
	var detail_list = document.querySelector('.point-detail-list')
	point_board.style.display = 'none'
	detail_list.style.display = 'flex'
}

function updateTemplate() {
	console.log('제발제발 되자')
	// Ajax 요청을 보냅니다.
	$.ajax({
		url: '/ManagerTest/', // 데이터베이스의 최신 데이터를 가져오는 뷰의 URL
		type: 'GET',
		success: function (data) {
			// 가져온 데이터를 사용하여 템플릿을 업데이트합니다.
			$('.point-board').html(data);
			console.log('5초마다 렌더링 되는중')

		},
		error: function (xhr, status, error) {
			console.error('Error occurred while updating template:', error);
		}
	});
}

// 일정한 간격으로 updateTemplate 함수를 호출합니다.
setInterval(updateTemplate, 5000); // 예: 5초마다 업데이트


document.addEventListener('touchmove', function (event) {
	if (event.scale !== 1) {
		event.preventDefault();
	}
}, false);

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
	var now = (new Date()).getTime();
	if (now - lastTouchEnd <= 100) {
		event.preventDefault();
	}
	lastTouchEnd = now;
}, false);


// SPORK - block pinch-zoom to force use of tooltip zoom
$(document).ready(function () {

	// the element you want to attach to, probably a wrapper for the page
	var myElement = document.getElementById('yourwrapperelement');
	// create a new hammer object, setting "touchAction" ensures the user can still scroll/pan
	var hammertime = new Hammer(myElement, {
		prevent_default: false,
		touchAction: "pan"
	});

	// pinch is not enabled by default in hammer
	hammertime.get('pinch').set({
		enable: true
	});

	// name the events you want to capture, then call some function if you want and most importantly, add the preventDefault to block the normal pinch action
	hammertime.on('pinch pinchend pinchstart doubletap', function (e) {
		console.log('captured event:', e.type);
		e.preventDefault();
	})
});

document.addEventListener('touchmove', function (event) {
	if (event.scale !== 1) {
		event.preventDefault();
	}
}, {passive: false});

document.documentElement.addEventListener('touchstart', function (event) {
	if (event.touches.length > 1) {
		event.preventDefault();
	}
}, false);

document.documentElement.addEventListener('touchmove', function (event) {
	event.preventDefault();
}, false);

document.addEventListener('touchmove', function (event) {
	event = event.originalEvent || event;
	if (event.scale > 1) {
		event.preventDefault();
	}
}, false);


$(function () {
	if (!(/iPad|iPhone|iPod/.test(navigator.userAgent))) return
	$(document.head).append(
		'<style>*{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}</style>'
	)
	$(window).on('gesturestart touchmove', function (evt) {
		if (evt.originalEvent.scale !== 1) {
			evt.originalEvent.preventDefault()
			document.body.style.transform = 'scale(1)'
		}
	})
})