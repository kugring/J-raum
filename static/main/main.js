function scrollToCategory(category) {
	// 해당 카테고리 요소를 찾아서
	var idValue = category + '-' + 'scrollMove';
	var element = document.getElementById(idValue);

	// 해당 요소가 존재하면 스크롤 이동을 수행
	if (element) {
		element.scrollIntoView({behavior: 'smooth'});
	}
}

function toggleClass(element) {
	// 클릭된 요소에 "selected" 클래스를 추가하고 나머지 요소의 클래스를 제거합니다.
	element.classList.add("selected");
	const allBoxes = document.querySelectorAll('.kategoria-item');
	allBoxes.forEach(box => {
		if (box !== element) {
			box.classList.remove("selected");
		}
	});
}


function toggleOption(element, optionName) {
	// 클릭된 요소에 "selected" 클래스를 추가하고 나머지 요소의 클래스를 제거합니다.
	element.classList.add("option-selected");
	element.classList.add("option-not-selected");
	const allBoxes = document.querySelectorAll('.item-' + optionName);
	allBoxes.forEach(box => {
		if (box !== element) {
			box.classList.add("option-not-selected");
			box.classList.remove("option-selected");
		}
	});
}

function openModal(id, category, name, en, price, img, deg, options) {
	var element = document.getElementById('orderModal' + '-' + en);// 해당 요소가 존재하면 스타일을 변경합니다.
	if (element) {
		// 스타일을 변경하여 디스플레이를 'flex'로 설정합니다.
		element.style.display = 'flex';
		var modals_overlay = document.getElementsByClassName('modal_overlay');
		var modals = document.getElementsByClassName('modal_window');

// HTMLCollection을 배열로 변환
		var modals_overlayArray = Array.from(modals_overlay);
		var modalsArray = Array.from(modals);

// 또는 ES6의 확산 연산자를 사용하여 배열로 변환
		for (var i = 0; i < modalsArray.length; i++) {
			(function (index) {
				setTimeout(function () {
					modals_overlayArray[index].classList.add('overlay-show');
				},); // 인덱스에 따라 딜레이를 조절합니다.
				setTimeout(function () {
					modalsArray[index].classList.add('window-show');
				},); // 인덱스에 따라 딜레이를 조절합니다.
			})(i);
		}
	}
}

function closeModal(id, category, name, en, price, img, deg, options) {
	var modal_selected = document.querySelectorAll('.modal-option-item-text');

	// 모달을 닫을때 기존의 옵션선택을 초기화 한다.
	modal_selected.forEach(box => {
		setTimeout(function () {
			box.classList.remove("option-not-selected");
			box.classList.remove("option-selected");
		}, 300); // 인덱스에 따라 딜레이를 조절합니다.
	});

	var element = document.getElementById('orderModal' + '-' + en);// 해당 요소가 존재하면 스타일을 변경합니다.
	if (element) {
		// 스타일을 변경하여 디스플레이를 'flex'로 설정합니다.
		var modals_overlay = document.getElementsByClassName('modal_overlay');
		var modals = document.getElementsByClassName('modal_window');

// HTMLCollection을 배열로 변환
		var modals_overlayArray = Array.from(modals_overlay);
		var modalsArray = Array.from(modals);

// 또는 ES6의 확산 연산자를 사용하여 배열로 변환
// var modalsArray = [...modals];
		for (var i = 0; i < modalsArray.length; i++) {
			(function (index) {
				setTimeout(function () {
					modals_overlayArray[index].classList.remove('overlay-show');
				},); // 인덱스에 따라 딜레이를 조절합니다.
				setTimeout(function () {
					modalsArray[index].classList.remove('window-show');
				},); // 인덱스에 따라 딜레이를 조절합니다.
			})(i);
		}
		setTimeout(function () {
			element.style.display = 'none';
		}, 300)
	}
	// 메뉴의 수량과 옥션의 수량을 최기화 하는 코드
	var menuQuantityElement = document.querySelector('.' + en + '-' + category);
	menuQuantityElement.innerText = 1;
	var OptionQuantityElements = document.querySelectorAll('.modal-option-quantity');
	OptionQuantityElements.forEach(function (element) {
		element.innerText = '0';
	})

	//
	var priceElement = document.querySelector('.price-' + en + '-' + category);
	priceElement.innerText = price + '원';
}

function decreaseQuantity(cafeMenu, optionName, price) {
	var modals_minus = document.getElementsByClassName(cafeMenu + '-' + optionName);
	for (var i = 0; i < modals_minus.length; i++) {
		(function (index) {
			modals_minus[index].style.transform = 'translateY(-0.4vh)';
			setTimeout(function () {
				modals_minus[index].style.transform = 'translateY(0vh)';
			}, 100);
		})(i);
	}
	var quantityElement = document.querySelector('.' + cafeMenu + '-' + optionName);
	var currentQuantity = quantityElement.textContent;
	// 가겨을 바꿔주는 코드
	var priceElement = document.querySelector('.price-' + cafeMenu + '-' + optionName);

	// 수량이 1 이상일 때만 감소하도록 설정
	if (currentQuantity > 0) {
		currentQuantity--;
		quantityElement.innerText = currentQuantity;
		if (priceElement) {
			priceElement.innerText = currentQuantity * price + '원';
		}
	}
}

function increaseQuantity(cafeMenu, optionName, price) {
	var modals_plus = document.getElementsByClassName(cafeMenu + '-' + optionName);
	for (var i = 0; i < modals_plus.length; i++) {
		(function (index) {
			modals_plus[index].style.transform = 'translateY(-0.4vh)';
			setTimeout(function () {
				modals_plus[index].style.transform = 'translateY(0vh)';
			}, 100);
		})(i);
	}
	var quantityElement = document.querySelector('.' + cafeMenu + '-' + optionName);
	var currentQuantity = quantityElement.textContent;
	var priceElement = document.querySelector('.price-' + cafeMenu + '-' + optionName);

	// 여기에서는 별다른 제한 없이 증가하도록 설정
	currentQuantity++;
	quantityElement.innerText = currentQuantity;
	if (priceElement) {
		priceElement.innerText = currentQuantity * price + '원';
	}
}

function orderAdd(id, category, name, en, price, img, deg, options) {

	// 주문수량을 가져오는 코드
	var orderQuantityElement = document.querySelector('.' + en + '-' + category);
	var orderQuantity = orderQuantityElement.textContent;
	// 수량 * 가격을 가져오는 코드
	var orderPriceElement = document.querySelector('.price-' + en + '-' + category);
	var priceXquantity = orderPriceElement.textContent;


	let fd = new FormData();

	let order_name = name;
	let order_price = JSON.stringify(parseFloat(price));
	let order_quantity = JSON.stringify(parseFloat(orderQuantity));

	fd.append('order_name', order_name);
	fd.append('order_price', order_price);
	fd.append('order_quantity', order_quantity);


	$.ajax({
		url: '/orderList/',
		data: fd,
		method: "POST",
		processData: false,
		contentType: false,
		success: function (data) {
			console.log('성공적으로 전송되었습니다.');
			// 이후 로직 수행...
		},
		error: function (error) {
			console.log('전송 중 오류가 발생했습니다.');
		}
	});

	var selectedOptionElements = document.querySelectorAll('.option-selected');
	var selectedOption = '';

	if (selectedOptionElements.length > 0) {
		// 여러 개의 .option-selected 요소가 있다면 모두 처리
		selectedOptionElements.forEach(function (element) {
			selectedOption += element.textContent.trim() + ' '; // 각 요소의 텍스트를 누적
		});
	}

	let order_options = selectedOption.trim().split(' ')

	document.getElementById('order-container').insertAdjacentHTML('beforeend',
		'<div class="order-swiper-container ' + 'order-swiper-container' + en + order_options.join('+') + '" >\
				<div class="order-swiper-box ' + 'swiper-' + en + '">\
					<div class="order-box ' + en + '_' + order_options.join('+') + '"> \
						<div class="order-item"> \
							<div class="order-item-left"> \
								<div class="order-item-left-top"> \
									<div class="order_name">' + name + '</div> \
								</div> \
								<div class="order-option-box">\
									<div class="order-option"> \
										샷추가\
									</div> \
									<div class="order-option"> \
										덜~뜨겁게\
									</div> \
								</div>\
							</div> \
							<div class="order-item-right"> \
								<div class="order-item-rigit-left"> \
									<div class="order-price">' + priceXquantity + '</div> \
									<div class="order-item-counter"> \
										<span class="material-symbols-outlined order-quantity-btn">remove</span> \
										<div class="order_quantity">' + order_quantity + '</div> \
										<span class="material-symbols-outlined order-quantity-btn">add</span> \
									</div> \
								</div> \
								<div class="order-item-right-right"> \
									<img class="order-item-img" src= ' + img + ' /> \
								</div> \
							</div> \
						</div> \
					</div>\
					<div class="order-option-change-btn" > 옵션변경 </div>\
					<div class="order-delete-btn" > 삭제 </div>\
				</div>\
			</div>\
			');
	//
	// var swiperBox = document.querySelector('.order-swiper-container'+ en + order_options.join('+'));
	//
	// 	swiperBox.scrollLeft += 127;


}