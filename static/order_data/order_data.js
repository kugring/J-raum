// 현재 날짜를 가져오는 함수
function getCurrentDate() {
	const today = new Date();
	const year = today.getFullYear();
	let month = (today.getMonth() + 1).toString().padStart(2, '0');
	let day = today.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', function () {
	// 페이지 로드시 input 요소의 기본값을 오늘의 날짜로 설정
	document.getElementById('dateInput').value = getCurrentDate();
});

function OrderDataSearch() {
	// 전체적인 테이블 바디!
	var Order_data_table = document.querySelector('#order-data-table')

	// 인풋에서 데이터를 가져옴
	var dateInput = document.getElementById('dateInput');
	var nameInput = document.getElementById('nameInput');
	var selectedDate = dateInput.value; // 날짜
	var selectedName = nameInput.value; // 이름


	// 라디오 버튼에서 데이터를 가져옴
	var radioButtons = document.getElementsByName('status');

	// 선택된 라디오 버튼의 값을 저장할 변수를 선언합니다.
	var selectedstatus = '';

	// 라디오 버튼 요소들을 반복하여 선택된 라디오 버튼의 값을 찾습니다.
	for (var i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].checked) {
			selectedstatus = radioButtons[i].value;
			break; // 선택된 값이 발견되면 반복문을 종료합니다.
		}
	}

	// 선택된 값이 저장된 변수를 사용합니다.
	console.log(selectedstatus);

	$.ajax({
		url: '/OrderDetail/',
		data: JSON.stringify({
			selected_date: selectedDate,
			selected_name: selectedName,
			selected_status: selectedstatus,
		}),
		method: "POST",
		contentType: "application/json",  // 추가: JSON 데이터를 전송함을 명시
		success: function (data) {
			Order_data_table.innerText = ''
			console.log('실행함?')

			// DB의 출력 갯수 만큼 for문이 돌 예정
			for (var i = 0; i < data.order_data.length; i++) {

				// 한층한층 누적되어야 할 row 셀렉터
				var table_row = document.createElement('tr');

				// console.log(data.order_data[i].order_status)
				var id = document.createElement('td');
				id.className = 'order-id-column'
				id.innerText = data.order_data[i].id
				table_row.appendChild(id)


				// console.log(data.order_data[i].order_status)
				var phone_number = document.createElement('td');
				phone_number.className = 'order-phone-number'
				phone_number.innerText = data.order_data[i].phone_number
				table_row.appendChild(phone_number)


				// console.log(data.order_data[i].order_status)
				var status = document.createElement('td');
				status.className = 'order-status-column'
				status.innerText = data.order_data[i].order_status
				table_row.appendChild(status)


				// console.log(data.order_data[i].order_name)
				var client_name = document.createElement('td');
				client_name.className = 'order-name-column'
				client_name.innerText = data.order_data[i].order_name
				table_row.appendChild(client_name)


				// console.log(data.order_data[i].total_quantity)
				var total_quantity = document.createElement('td');
				total_quantity.className = 'total-quantity-column'
				total_quantity.innerText = data.order_data[i].total_quantity + '잔'
				table_row.appendChild(total_quantity)


				// console.log(data.order_data[i].total_price)
				var total_price = document.createElement('td');
				total_price.className = 'total-price-column'
				total_price.innerText = numberWithCommas(data.order_data[i].total_price) + '원';
				table_row.appendChild(total_price)


				// data.order_data[i].modified_at은 ISO 형식의 문자열이라고 가정합니다.
				var date = new Date(data.order_data[i].modified_at);
				var month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
				var day = date.getDate();
				var hours = date.getHours();
				var minutes = date.getMinutes();


				// 월과 일이 한 자리 수인 경우 앞에 0을 붙여줍니다.
				var monthStr = month < 10 ? '0' + month : month;
				var dayStr = day < 10 ? '0' + day : day;

				// 시간과 분이 한 자리 수인 경우 앞에 0을 붙여줍니다.
				var hoursStr = hours < 10 ? '0' + hours : hours;
				var minutesStr = minutes < 10 ? '0' + minutes : minutes;

				// console.log(data.order_data[i].modified_at)
				var modified_at = document.createElement('td');
				modified_at.className = 'modified-at-column'
				modified_at.innerText = monthStr + '/' + dayStr + ' [' + hoursStr + ':' + minutesStr + ']';
				table_row.appendChild(modified_at)


				var etc = document.createElement('td');
				etc.className = 'order-etc'
				var etc_btn = document.createElement('div');

				if (data.order_data[i].order_status === '대기') {
					etc_btn.className = 'delete'
					etc_btn.onclick = function () {
						order_delete(this);
					};
					etc_btn.innerText = '취소 가능'
				} else {
					etc_btn.className = 'complete'
					etc.innerText = '취소 불가'
				}
				etc.appendChild(etc_btn)
				table_row.appendChild(etc)

				// for문 한번 돌때마다 row를 집어 넣는다.
				Order_data_table.appendChild(table_row)
			}
		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});
}

// 숫자를 쉼표가 있는 형식으로 포맷하는 함수
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//데이터 삭제하는 코드
function order_delete(element) {
	// 행에서 id값을 가져와 필터링하고 삭제한다.
	var id = element.parentNode.parentNode.querySelector('.order-id-column')
	var name = element.parentNode.parentNode.querySelector('.order-name-column').textContent
	var phone_number = element.parentNode.parentNode.querySelector('.order-phone-number').textContent
	var price = element.parentNode.parentNode.querySelector('.total-price-column').textContent
	var str_id = id.textContent

	var renew_number = parseInt(price.replace(/,/g, ''));

	console.log(id, name, phone_number, renew_number)

	$.ajax({
		url: '/OrderDelete/',
		data: JSON.stringify({
			selected_id: str_id,
			name: name,
			phone_number: phone_number,
			price: renew_number,
		}),
		method: "POST",
		contentType: "application/json",  // 추가: JSON 데이터를 전송함을 명시
		success: function (data) {
			console.log('성공적으로 전송하였습니다.');
		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});

	var Delete_element = element.parentNode.parentNode
	Delete_element.remove()
}


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