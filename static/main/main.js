function scrollToCategory(category) {
	// 해당 카테고리 요소를 찾아서
	var idValue = category + '-' + 'scrollMove';
	var element = document.getElementById(idValue);

	// 해당 요소가 존재하면 스크롤 이동을 수행
	if (element) {
		element.scrollIntoView({behavior: 'smooth'});
	}
}

function openModal(id, category, name, en, price, img, deg, options) {
	var element = document.getElementById('orderModal' + '-' + en);// 해당 요소가 존재하면 스타일을 변경합니다.
	if (element) {
		// 스타일을 변경하여 디스플레이를 'flex'로 설정합니다.
		element.style.display = 'flex';
	}
}
function closeModal(id, category, name, en, price, img, deg, options) {
	var element = document.getElementById('orderModal' + '-' + en);// 해당 요소가 존재하면 스타일을 변경합니다.
	if (element) {
		// 스타일을 변경하여 디스플레이를 'flex'로 설정합니다.
		element.style.display = 'none';
	}
}

// 초기 수량 설정
let quantity = 1;

// 수량을 감소시키는 함수
function decreaseQuantity(option_name) {
	if (quantity > 1) {
		quantity--;
		updateQuantityDisplay(option_name);
	}
}

// 수량을 증가시키는 함수
function increaseQuantity(option_name) {
	quantity++;
	updateQuantityDisplay(option_name);
}

// 수량을 초기화하는 함수
function resetQuantity(option_name) {
	quantity = 1;
	updateQuantityDisplay(option_name);
}

// 수량을 화면에 업데이트하는 함수
function updateQuantityDisplay(option_name) {
	// modal-quantity 클래스를 가진 모든 요소에 대해 반복
	var quantityElements = document.getElementsByClassName(option_name);

	for (var i = 0; i < quantityElements.length; i++) {
		quantityElements[i].innerText = quantity;
	}
}
