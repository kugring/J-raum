// function scrollToCategory(category) {
// 	// 해당 카테고리 요소를 찾아서
// 	var idValue = category + '-' + 'scrollMove';
// 	var element = document.getElementById(idValue);
//
// 	// 해당 요소가 존재하면 스크롤 이동을 수행
// 	if (element) {
// 		element.scrollIntoView({behavior: 'smooth'});
// 	}
// }
//
// function toggleClass(element) {
// 	// 클릭된 요소에 "selected" 클래스를 추가하고 나머지 요소의 클래스를 제거합니다.
// 	element.classList.add("selected");
// 	const allBoxes = document.querySelectorAll('.kategoria-item');
// 	allBoxes.forEach(box => {
// 		if (box !== element) {
// 			box.classList.remove("selected");
// 		}
// 	});
// }
//
//
// function toggleOption(element, optionName) {
// 	var test = element.querySelector('.modal-option-item-text');
//
// 	// 클릭된 요소에 "selected" 클래스를 추가하고 나머지 요소의 클래스를 제거합니다.
// 	element.classList.add("option-selected");
// 	element.classList.add("option-not-selected");
// 	const allBoxes = document.querySelectorAll('.item-' + optionName);
// 	allBoxes.forEach(box => {
// 		if (box !== element) {
// 			box.classList.add("option-not-selected");
// 			box.classList.remove("option-selected");
// 		}
// 	});
// }
//
// function openModal(id, category, name, en, price, img, deg, degNum, shot) {
// 	var element = document.getElementById('orderModal' + '-' + en);// 해당 요소가 존재하면 스타일을 변경합니다.
// 	if (element) {
// 		// 스타일을 변경하여 디스플레이를 'flex'로 설정합니다.
// 		element.style.display = 'flex';
// 		var modals_overlay = document.getElementsByClassName('modal_overlay');
// 		var modals = document.getElementsByClassName('modal_window');
//
// // HTMLCollection을 배열로 변환
// 		var modals_overlayArray = Array.from(modals_overlay);
// 		var modalsArray = Array.from(modals);
//
// // 또는 ES6의 확산 연산자를 사용하여 배열로 변환
// 		for (var i = 0; i < modalsArray.length; i++) {
// 			(function (index) {
// 				setTimeout(function () {
// 					modals_overlayArray[index].classList.add('overlay-show');
// 				},); // 인덱스에 따라 딜레이를 조절합니다.
// 				setTimeout(function () {
// 					modalsArray[index].classList.add('window-show');
// 				},); // 인덱스에 따라 딜레이를 조절합니다.
// 			})(i);
// 		}
// 	}
// }
//
// function closeModal(id, category, name, en, price, img, deg, degNum, shot) {
// 	var modal_selected = document.querySelectorAll('.modal-option-item-text');
//
// 	// 모달을 닫을때 기존의 옵션선택을 초기화 한다.
// 	modal_selected.forEach(box => {
// 		setTimeout(function () {
// 			box.classList.remove("option-not-selected");
// 			box.classList.remove("option-selected");
// 		}, 300); // 인덱스에 따라 딜레이를 조절합니다.
// 	});
//
// 	var element = document.getElementById('orderModal' + '-' + en);// 해당 요소가 존재하면 스타일을 변경합니다.
// 	if (element) {
// 		// 스타일을 변경하여 디스플레이를 'flex'로 설정합니다.
// 		var modals_overlay = document.getElementsByClassName('modal_overlay');
// 		var modals = document.getElementsByClassName('modal_window');
//
// // HTMLCollection을 배열로 변환
// 		var modals_overlayArray = Array.from(modals_overlay);
// 		var modalsArray = Array.from(modals);
//
// // 또는 ES6의 확산 연산자를 사용하여 배열로 변환
// // var modalsArray = [...modals];
// 		for (var i = 0; i < modalsArray.length; i++) {
// 			(function (index) {
// 				setTimeout(function () {
// 					modals_overlayArray[index].classList.remove('overlay-show');
// 				},); // 인덱스에 따라 딜레이를 조절합니다.
// 				setTimeout(function () {
// 					modalsArray[index].classList.remove('window-show');
// 				},); // 인덱스에 따라 딜레이를 조절합니다.
// 			})(i);
// 		}
// 		setTimeout(function () {
// 			element.style.display = 'none';
// 		}, 300)
// 	}
// 	// 메뉴의 수량과 옥션의 수량을 최기화 하는 코드
// 	var menuQuantityElement = document.querySelector(`.modal-menu-quantity.${en}.${category}`);
// 	menuQuantityElement.innerText = 1;
// 	var OptionQuantityElements = document.querySelectorAll('.modal-option-quantity');
// 	OptionQuantityElements.forEach(function (element) {
// 		element.innerText = '0';
// 	})
//
// 	//
// 	var priceElement = document.querySelector(`.modal-menu-price.${en}.${category}`);
// 	priceElement.innerText = price + '원';
// }
//
// function decreaseQuantity(cafeMenu, optionName, price) {
// 	var modals_minus = document.getElementsByClassName(cafeMenu + '-' + optionName);
// 	for (var i = 0; i < modals_minus.length; i++) {
// 		(function (index) {
// 			modals_minus[index].style.transform = 'translateY(-0.4vh)';
// 			setTimeout(function () {
// 				modals_minus[index].style.transform = 'translateY(0vh)';
// 			}, 100);
// 		})(i);
// 	}
// 	var quantityElement = document.querySelector(`.${cafeMenu}.${optionName}`);
// 	var currentQuantity = quantityElement.textContent;
// 	// 가겨을 바꿔주는 코드
// 	var priceElement = document.querySelector('.price-' + cafeMenu + '-' + optionName);
//
// 	// 수량이 1 이상일 때만 감소하도록 설정
// 	if (currentQuantity > 0) {
// 		currentQuantity--;
// 		quantityElement.innerText = currentQuantity;
// 		if (priceElement) {
// 			priceElement.innerText = currentQuantity * price + '원';
// 		}
// 	}
// }
//
// function increaseQuantity(cafeMenu, optionName, price) {
// 	var modals_plus = document.getElementsByClassName(cafeMenu + '-' + optionName);
// 	for (var i = 0; i < modals_plus.length; i++) {
// 		(function (index) {
// 			modals_plus[index].style.transform = 'translateY(-0.4vh)';
// 			setTimeout(function () {
// 				modals_plus[index].style.transform = 'translateY(0vh)';
// 			}, 100);
// 		})(i);
// 	}
// 	var quantityElement = document.querySelector(`.${cafeMenu}.${optionName}`);
// 	var currentQuantity = quantityElement.textContent;
// 	var priceElement = document.querySelector('.price-' + cafeMenu + '-' + optionName);
//
// 	// 여기에서는 별다른 제한 없이 증가하도록 설정
// 	currentQuantity++;
// 	quantityElement.innerText = currentQuantity;
// 	if (priceElement) {
// 		priceElement.innerText = currentQuantity * price + '원';
// 	}
// }
//
// function orderAdd(id, category, name, en, price, img, deg, degNum, shot) {
//
// 	// 주문수량을 가져오는 코드
// 	var orderQuantityElement = document.querySelector(`.modal-menu-quantity.${en}.${category}`);
// 	var orderQuantity = orderQuantityElement.textContent;
// 	// 수량 * 가격을 가져오는 코드
// 	var orderPriceElement = document.querySelector(`.modal-menu-price.${en}.${category}`);
// 	var priceXquantity = orderPriceElement.textContent;
//
//
// 	let fd = new FormData();
//
// 	let order_name = name;
// 	let order_price = JSON.stringify(parseFloat(price));
// 	let order_quantity = JSON.stringify(parseFloat(orderQuantity));
//
// 	fd.append('order_name', order_name);
// 	fd.append('order_price', order_price);
// 	fd.append('order_quantity', order_quantity);
//
//
// 	$.ajax({
// 		url: '/orderList/', data: fd, method: "POST", processData: false, contentType: false, success: function (data) {
// 			console.log('성공적으로 전송되었습니다.');
// 			// 이후 로직 수행...
// 		}, error: function (error) {
// 			console.log('전송 중 오류가 발생했습니다.');
// 		}
// 	});
//
// 	var selectedOptionElements = document.querySelectorAll('.option-selected');
// 	var selectedOption = '';
//
// 	if (selectedOptionElements.length > 0) {
// 		// 여러 개의 .option-selected 요소가 있다면 모두 처리
// 		selectedOptionElements.forEach(function (element) {
// 			selectedOption += element.textContent.trim() + ' '; // 각 요소의 텍스트를 누적
// 		});
// 	}
// 	let order_options = selectedOption.trim().split(' ')
// 	var options = order_options.join(' ').toString()
// 	console.log(options)
//
// 	// 메뉴 중복을 확인하기 위해 기존 클래스명이 존재하는지 확인하는것!
// 	if (options) {
// 		var orderDuplicationTest = document.querySelector(`.order-swiper-container.${en}.${options}`);
// 	} else {
// 		var orderDuplicationTest = document.querySelector(`.order-swiper-container.${en}`);
// 	}
//
//
// 	// 메뉴이름이 중복되는게 있는지 없는지 구별해주는 코드
// 	if (orderDuplicationTest) {
// 		var Duplication_menu = true;
// 	} else {
// 		var Duplication_menu = false;
// 	}
//
//
// 	// 메뉴가 중복된 경우
// 	if (Duplication_menu) {
// 		// 기존 설탕시럽과 비교하는 코드
// 		var current_sugarPump = orderDuplicationTest.querySelector('.order-sugarPump')
// 		if (current_sugarPump !== null) {
// 			var current_sugarPumpNum = parseInt(current_sugarPump.textContent);
// 			var renew_sugarPump = document.querySelector(`.modal-option-quantity.${en}.설탕시럽`)
// 			var renew_sugarPumpNum = parseInt(renew_sugarPump.textContent)
// 			var Duplication_sugarPump = (current_sugarPumpNum === renew_sugarPumpNum)
// 			console.log('설탕:' + Duplication_sugarPump)
// 		} else {
// 			var Duplication_sugarPump = false
// 		}
//
// 		// 기존 바닐라시럽과 비교하는 코드
// 		var current_vanillaPump = orderDuplicationTest.querySelector('.order-vanillaPump')
// 		if (current_vanillaPump !== null) {
// 			var current_vanillaPumpNum = parseInt(current_vanillaPump.textContent);
// 			var renew_vanillaPump = document.querySelector(`.modal-option-quantity.${en}.바닐라시럽`)
// 			var renew_vanillaPumpNum = parseInt(renew_vanillaPump.textContent)
// 			var Duplication_vanillaPump = (current_vanillaPumpNum === renew_vanillaPumpNum)
// 			console.log('바닐라:' + Duplication_vanillaPump)
// 		} else {
// 			var Duplication_vanillaPump = false
// 		}
//
// 		// 기존 카라멜시럽과 비교하는 코드
// 		var current_caramelPump = orderDuplicationTest.querySelector('.order-caramelPump')
// 		if (current_caramelPump !== null) {
// 			var current_caramelPumpNum = parseInt(current_caramelPump.textContent);
// 			var renew_caramelPump = document.querySelector(`.modal-option-quantity.${en}.카라멜시럽`)
// 			var renew_caramelPumpNum = parseInt(renew_caramelPump.textContent)
// 			var Duplication_caramelPump = (current_caramelPumpNum === renew_caramelPumpNum)
// 			console.log('카라멜:' + Duplication_caramelPump)
// 		} else {
// 			var Duplication_caramelPump = false
// 		}
//
// 		// 모든 시럽의 양이 동일한 경우에 true를 반환함
// 		var Duplication_pump = Duplication_sugarPump && Duplication_vanillaPump && Duplication_caramelPump
//
// 		// 중복이 있는 경우 수량과 가격만 변동됨
// 		if (Duplication_pump === true) {
// 			var currentMenuQuantityElement = document.querySelector('.' + 'order-quantity' + en + options)
// 			var currentMenuQuantity = parseInt(currentMenuQuantityElement.textContent, 10); // 문자열을 10진수로 파싱하여 숫자로 변환
// 			var renewMenuQuantityElement = document.querySelector('.' + 'order-quantity' + en + order_options.join('+'))
// 			var renewMenuQuantity = currentMenuQuantity + parseInt(order_quantity, 10);
// 			renewMenuQuantityElement.innerText = renewMenuQuantity;
// 			var renewPrice = document.querySelector('.' + 'order-price' + en + order_options.join('+'))
// 			renewPrice.innerText = renewMenuQuantity * price + '원'
// 		}
// 		// 중복이 없는 새로운 메뉴인 오더리스트에 추가되는 코드
// 		else {
// 			if (order_quantity > 0) {
// 				const orderContainer = document.getElementById('order-container');
// 				const orderSwiperContainer = document.createElement('div');
//
// 				// 펌프 갯수 수량을 업데이트 하는 코드
// 				var sugarPump = document.querySelector(`.modal-option-quantity.${en}.설탕시럽`)
// 				if (sugarPump) {
// 					var sugarPumpNum = sugarPump.textContent
// 				} else {
// 					var sugarPumpNum = 0;
// 				}
// 				var vanillaPump = document.querySelector(`.modal-option-quantity.${en}.바닐라시럽`)
// 				if (vanillaPump) {
// 					var vanillaPumpNum = vanillaPump.textContent
// 				} else {
// 					var vanillaPumpNum = 0;
// 				}
// 				var caramelPump = document.querySelector(`.modal-option-quantity.${en}.카라멜시럽`)
// 				if (caramelPump) {
// 					var caramelPumpNum = caramelPump.textContent
//
// 				} else {
// 					var caramelPumpNum = 0;
// 				}
//
// 				orderSwiperContainer.className = `order-swiper-container ${en} ${order_options.join(' ')}`;
//
// 				orderSwiperContainer.innerHTML = `
//         <div class="order-swiper-box swiper-${en}">
//             <div class="order-box ${en}_${order_options.join('+')}">
//                 <div class="order-item">
//                     <div class="order-item-left order-item-left${en}${order_options.join('+')}">
//                             <div class="order-name">${name}</div>
//                             <div class="order-back-data">
// 								<div class="order-id">${id}</div>
// 								<div class="order-deg">${degNum}</div>
// 								<div class="order-shot">${shot}</div>
// 								<div class="order-sugarPump">${sugarPumpNum}</div>
// 								<div class="order-vanillaPump">${vanillaPumpNum}</div>
// 								<div class="order-caramelPump">${caramelPumpNum}</div>
//                             </div>
//                     </div>
//                             <div class="order-price order-price${en}${order_options.join('+')}">${priceXquantity}</div>
//                             <div class="order-item-counter">
//                                 <div class="material-symbols-outlined order-quantity-btn" onclick="Ioqm(this)">remove</div>
//                                 <div class="order-quantity order-quantity${en}${order_options.join('+')}">${order_quantity}</div>
//                                 <div class="material-symbols-outlined order-quantity-btn" onclick="Ioqp(this)">add</div>
//                             </div>
//                 </div>
//             </div>
//             <div id="changeOptionBtn"  class="order-option-change-btn" onclick="changeTheOption('${en}')"> 옵션변경 </div>
//             <div class="order-delete-btn" onclick="orderDelete()"> 삭제 </div>
//         </div>
//     `;
//
// 				orderContainer.appendChild(orderSwiperContainer);
//
// 				for (var i = 0; i < order_options.length; i++) {
// 					var optionContainerClassName = 'order-item-left' + en + order_options.join('+');
// 					var optionContainerElement = document.getElementsByClassName(optionContainerClassName)[0];
// 					var optionBoxElement = document.createElement('div')
// 					optionBoxElement.className = `order-option-box ${en}-${order_options.join('+')}`;
// 					var optionElement = document.createElement('div')
// 					optionElement.className = `order-option ${order_options[i]}`;
// 					if (order_options[i] !== '') {
// 						optionElement.innerText = order_options[i]
// 						optionBoxElement.appendChild(optionElement);
// 						optionContainerElement.appendChild(optionBoxElement);
// 					}
// 				}
// 			}
// 		}
// 	}// 중복이 없는 새로운 메뉴인 오더리스트에 추가되는 코드
// 	else {
// 		if (order_quantity > 0) {
// 			// 펌프 갯수 수량을 업데이트 하는 코드
// 			var sugarPump = document.querySelector(`.modal-option-quantity.${en}.설탕시럽`)
// 			if (sugarPump) {
// 				var sugarPumpNum = sugarPump.textContent
// 			} else {
// 				var sugarPumpNum = 0;
// 			}
// 			var vanillaPump = document.querySelector(`.modal-option-quantity.${en}.바닐라시럽`)
// 			if (vanillaPump) {
// 				var vanillaPumpNum = vanillaPump.textContent
// 			} else {
// 				var vanillaPumpNum = 0;
// 			}
// 			var caramelPump = document.querySelector(`.modal-option-quantity.${en}.카라멜시럽`)
// 			if (caramelPump) {
// 				var caramelPumpNum = caramelPump.textContent
//
// 			} else {
// 				var caramelPumpNum = 0;
// 			}
//
// 			// 오더 컨테이너에 스와이프 박스 통채로 넣기
// 			const orderContainer = document.getElementById('order-container');
// 			const orderSwiperContainer = document.createElement('div');
// 			orderSwiperContainer.className = `order-swiper-container ${en} ${order_options.join(' ')} sugar_${sugarPumpNum} vanilla_${vanillaPumpNum} caramel_${caramelPumpNum}`;
// 			orderSwiperContainer.innerHTML = `
//         <div class="order-swiper-box">
//             <div class="order-box">
//                 <div class="order-item">
//                     <div class="order-item-left">
//                             <div class="order-name">${name}</div>
//                             <div class="order-back-data">
// 								<div class="order-id">${id}</div>
// 								<div class="order-deg">${degNum}</div>
// 								<div class="order-shot">${shot}</div>
// 								<div class="order-sugarPump">${sugarPumpNum}</div>
// 								<div class="order-vanillaPump">${vanillaPumpNum}</div>
// 								<div class="order-caramelPump">${caramelPumpNum}</div>
//                             </div>
//                     </div>
//                             <div class="order-price order-price">${priceXquantity}</div>
//                             <div class="order-item-counter">
//                                 <div class="material-symbols-outlined order-quantity-btn" onclick="Ioqm(this)">remove</div>
//                                 <div class="order-quantity order-quantity">${order_quantity}</div>
//                                 <div class="material-symbols-outlined order-quantity-btn" onclick="Ioqp(this)">add</div>
//                             </div>
//                 </div>
//             </div>
//             <div id="changeOptionBtn"  class="order-option-change-btn" onclick="changeTheOption('${en}')"> 옵션변경 </div>
//             <div class="order-delete-btn" onclick="orderDelete()"> 삭제 </div>
//         </div>
//     `;
//
// 			orderContainer.appendChild(orderSwiperContainer);
//
// 			for (var i = 0; i < order_options.length; i++) {
// 				var optionContainerElement = document.getElementsByClassName('order-item-left')[0];
// 				var optionBoxElement = document.createElement('div')
// 				optionBoxElement.className = `order-option-box`;
// 				var optionElement = document.createElement('div')
// 				optionElement.className = `order-option ${order_options[i]}`;
// 				if (order_options[i] !== '') {
// 					optionElement.innerText = order_options[i]
// 					optionBoxElement.appendChild(optionElement);
// 					optionContainerElement.appendChild(optionBoxElement);
// 				}
// 			}
// 		}
// 	}
//
// }
//
// function Ioqp(btn) {
// 	var pE1 = btn.parentNode;
// 	var cE1 = Array.from(pE1.children);
// 	var pE11 = btn.parentNode.parentNode;
// 	var cE11 = Array.from(pE11.children);
// 	if (cE1[1]) {
// 		var currentValue = parseInt(cE1[1].textContent, 10);
// 		if (cE1[1]) {
// 			cE1[1].innerText = currentValue + 1;
// 			// 현재 가격에서 '원'을 빼고 정수화
// 			var cVcE11 = parseInt(cE11[0].textContent.replace('원', ''), 10);
// 			if (cVcE11) {
// 				//  현재 값 + ( 현재 값 / 현재 수량 ) + '원' 으로 설정
// 				cE11[0].innerText = cVcE11 + cVcE11 / currentValue + '원'
// 			}
// 		}
// 	}
// }
//
// function Ioqm(btn) {
// 	var pE2 = btn.parentNode;
// 	var cE2 = Array.from(pE2.children);
// 	var pE22 = btn.parentNode.parentNode;
// 	var cE22 = Array.from(pE22.children);
// 	if (cE2[1]) {
// 		var currentValue = parseInt(cE2[1].textContent, 10);
// 		if (currentValue > 1) {
// 			cE2[1].innerText = currentValue - 1;
// 			// 현재 가격에서 '원'을 빼고 정수화
// 			var cVcE22 = parseInt(cE22[0].textContent.replace('원', ''), 10);
// 			if (cVcE22) {
// 				//  현재 가격 - ( 현재 가격 / 현재 수량 ) + '원' 으로 설정
// 				cE22[0].innerText = cVcE22 - cVcE22 / currentValue + '원'
// 			}
// 		}
// 	}
// }
//
// function changeTheOption(en) {
// 	console.log(en);
// }
//
//
// function orderDelete() {
// 	var clickedElement = event.target;
// 	var parentElement = clickedElement.parentNode;
// 	var grandparentElement = parentElement.parentNode;
// 	grandparentElement.remove();
// }
//
// function orderAllDelete() {
// 	var orderContainerElement = document.querySelector('.order-container')
// 	orderContainerElement.innerHTML = '';
// }
//
// function openPayModal() {
// 	var possible_num = document.querySelector('.order-total-quantity-num').textContent
// 	var payModalOverlay = document.querySelector('.pay-modal-overlay')
// 	var payModalWindow = document.querySelector('.pay-modal-window')
// 	if (possible_num > 0) {
// 		payModalOverlay.style.display = 'flex';
//
// 		// 할수 없지만 seTimeout이 없으면 애니메이션 효과가 적용되지 않는다??!!
// 		setTimeout(function () {
// 			payModalOverlay.classList.add('overlay-show');
// 			payModalWindow.classList.add('window-show');
// 		},); // 인덱스에 따라 딜레이를 조절합니다.
// 	}
// }
//
//
// function closePayModal() {
// 	var payModalOverlay = document.querySelector('.pay-modal-overlay')
// 	var payModalWindow = document.querySelector('.pay-modal-window')
//
// 	// 할수 없지만 seTimeout이 없으면 애니메이션 효과가 적용되지 않는다??!!
// 	setTimeout(function () {
// 		payModalOverlay.classList.remove('overlay-show');
// 		payModalWindow.classList.remove('window-show');
// 	},); // 인덱스에 따라 딜레이를 조절합니다.
//
// 	setTimeout(function () {
// 		payModalOverlay.style.display = 'none';
// 	}, 300)
// }
//
// function openCashModal() {
// 	var payModalOverlay = document.querySelector('.pay-modal-overlay')
// 	var payModalWindow = document.querySelector('.pay-modal-window')
// 	var cashModalOverlay = document.querySelector('.cash-modal-overlay')
// 	var cashModalWindow = document.querySelector('.cash-modal-window');
//
// 	// 결제방식 선택 창의 모션클래스를 제거하고 애니메이셔가 보이지 않게 즉시 display를 none으로 바꾼다.
// 	payModalWindow.classList.remove('window-show');
// 	payModalOverlay.style.backgroundColor = '#00000000'
// 	payModalOverlay.classList.remove('overlay-show');
//
// 	setTimeout(function () {
// 		payModalOverlay.style.display = 'none';
// 		payModalOverlay.style.backgroundColor = '#000000CC'
// 	}, 1000)
//
//
// // 캐쉬모달을 화면 상단 밖으로 이동시킨다.
// 	cashModalWindow.classList.add('hidden')
//
// // 이후에 즉시 캐쉬모달를 display = flex로 바꾼다.
// 	cashModalOverlay.style.display = 'flex'
// 	cashModalWindow.style.display = 'flex';
//
// // 0.3초 뒤에 캐쉬윈도우를 아래로 이동시킨다.
// 	setTimeout(function () {
// 		cashModalWindow.classList.remove('hidden')
// 	}, 100)
// }
//
// function closeCashModal() {
//
// 	var cashModalOverlay = document.querySelector('.cash-modal-overlay')
// 	var cashModalWindow = document.querySelector('.cash-modal-window');
//
// 	// 캐쉬 윈도우가 먼거 올라간다.
// 	cashModalWindow.classList.add('hidden')
//
// 	// 이후에 한박자 느리게 오버레이가 사라진다.
// 	setTimeout(function () {
// 		cashModalOverlay.style.opacity = 0
// 	}, 300)
//
// 	// 이후에 가능장애가 없도록 display를 none으로 바꾸고 투명도도 다시 돌려놓고 클래스도 제거해준다.
// 	setTimeout(function () {
// 		cashModalOverlay.style.display = 'none';
// 		cashModalOverlay.style.opacity = 1
// 		cashModalWindow.classList.remove('hidden')
// 	}, 500)
//
// }
//
// function openPointModal() {
// 	var payModalOverlay = document.querySelector('.pay-modal-overlay')
// 	var payModalWindow = document.querySelector('.pay-modal-window')
// 	var pointModalOverlay = document.querySelector('.point-modal-overlay')
// 	var pointModalWindow = document.querySelector('.point-modal-window');
//
// 	// 결제방식 선택 창의 모션클래스를 제거하고 애니메이셔가 보이지 않게 즉시 display를 none으로 바꾼다.
// 	payModalWindow.classList.remove('window-show');
// 	payModalOverlay.style.backgroundColor = '#00000000'
// 	payModalOverlay.classList.remove('overlay-show');
//
// 	setTimeout(function () {
// 		payModalOverlay.style.display = 'none';
// 		payModalOverlay.style.backgroundColor = '#000000CC'
// 	}, 1000)
//
//
// // 캐쉬모달을 화면 상단 밖으로 이동시킨다.
// 	pointModalWindow.classList.add('hidden')
//
// // 이후에 즉시 캐쉬모달를 display = flex로 바꾼다.
// 	pointModalOverlay.style.display = 'flex'
// 	pointModalWindow.style.display = 'flex';
//
// // 0.3초 뒤에 캐쉬윈도우를 아래로 이동시킨다.
// 	setTimeout(function () {
// 		pointModalWindow.classList.remove('hidden')
// 	}, 100)
// }
//
// function closePointModal() {
// 	var pointModalOverlay = document.querySelector('.point-modal-overlay')
// 	var pointModalWindow = document.querySelector('.point-modal-window')
// 	setTimeout(function () {
// 		clearPhoneNumber()
// 	}, 300)
//
// 	// 캐쉬모달을 화면 상단 밖으로 이동시킨다.
// 	pointModalWindow.classList.add('hidden')
//
// 	// 이후에 한박자 느리게 오버레이가 사라진다.
// 	setTimeout(function () {
// 		pointModalOverlay.style.opacity = 0
// 	}, 300)
//
// 	// 이후에 가능장애가 없도록 display를 none으로 바꾸고 투명도도 다시 돌려놓고 클래스도 제거해준다.
// 	setTimeout(function () {
// 		pointModalOverlay.style.display = 'none';
// 		pointModalOverlay.style.opacity = 1
// 		pointModalWindow.classList.remove('hidden')
// 	}, 500)
//
//
// }
//
// document.addEventListener("DOMContentLoaded", function () {
// 	// Mutation Observer 생성
// 	var observer = new MutationObserver(function (mutations) {
// 		// 메뉴 합계를 출력하는 코드
// 		var menuQuantityElements = document.querySelectorAll('.order-quantity');
// 		var quantitySum = 0;
// 		menuQuantityElements.forEach(function (element) {
// 			// 각 요소의 내용물(숫자) 가져오기
// 			var quantity = parseInt(element.innerText, 10);
// 			// 숫자가 NaN이 아닌 경우에만 더하기
// 			if (!isNaN(quantity)) {
// 				quantitySum += quantity;
// 			}
// 		});
// 		var menuPriceTotalElement = document.querySelector('.order-total-pay-price-num');
// 		var menuQuantityTotalElement = document.querySelector('.order-total-quantity-num')
// 		var orderPayBsox = document.querySelector('.order-pay-box')
// 		menuQuantityTotalElement.innerHTML = quantitySum
//
// 		var menuPriceElements = document.querySelectorAll('.order-price');
// 		var priceSum = 0;
// 		menuPriceElements.forEach(function (element) {
// 			// 각 요소의 내용물(문자열) 가져오기
// 			var priceText = element.innerText;
// 			// '원' 제거하고 숫자만 추출
// 			var priceNumber = parseInt(priceText.replace('원', ''), 10);
// 			// 숫자가 NaN이 아닌 경우에만 더하기
// 			if (!isNaN(priceNumber)) {
// 				priceSum += priceNumber;
// 			}
// 		});
//
// 		// 주문량이 1개 이상인 경우에는 버튼의 css를 활성화 시키는 코드
// 		if (quantitySum > 0) {
// 			orderPayBsox.classList.add('active')
// 			// 총 'n'잔 이라는 텍스트를 기입함
// 			menuPriceTotalElement.innerHTML = '합계:' + '&nbsp;&nbsp;&nbsp;' + priceSum + '&nbsp;' + '원';
// 		} else {
// 			orderPayBsox.classList.remove('active')
// 			// 주문량 0 인 경우 안내 메세지 출력
// 			menuPriceTotalElement.innerHTML = '주문 부탁드립니다!^^'
// 		}
//
//
// 	});
// 	// 감시 대상 요소 설정
// 	var targetNode = document.querySelector('.order-body'); // 또는 원하는 다른 노드로 변경
// 	// 감시할 변화 유형 설정
// 	var config = {attributes: true, childList: true, subtree: true};
// 	// Mutation Observer 시작
// 	observer.observe(targetNode, config);
// });
//
//
// let currentDigit = 1;
//
// function appendNumber(number) {
// 	const digitInput = document.getElementById(`digit${currentDigit}`);
// 	digitInput.innerText = number;
// 	currentDigit = (currentDigit % 4) + 1;
// 	checkAndSubmit();
// }
//
// function clearPhoneNumber() {
// 	for (let i = 1; i <= 4; i++) {
// 		const digitInput = document.getElementById(`digit${i}`);
// 		digitInput.innerText = '';
// 	}
//
// 	currentDigit = 1;
// }
//
// function removeNumber() {
// 	currentDigit = (currentDigit - 2 + 4) % 4 + 1;
//
// 	const digitInput = document.getElementById(`digit${currentDigit}`);
// 	digitInput.innerText = '';
//
// 	checkAndSubmit();
// }
//
// function checkAndSubmit() {
// 	const phoneNumberInputs = Array.from({length: 4}, (_, i) => document.getElementById(`digit${i + 1}`).innerText);
//
// 	const hasValue = phoneNumberInputs.some(value => value.trim() !== '');
//
// 	const submitButton = document.getElementById('submitBtn');
// 	if (submitButton) {
// 		submitButton.disabled = !hasValue;
// 	}
//
// 	if (hasValue && currentDigit === 1) {
// 		const phoneNumber = phoneNumberInputs.join('');
// 		searchPhoneNumber(phoneNumber);
// 	}
//
// 	if (phoneNumberInputs.every(value => value.trim() !== '')) {
// 		setTimeout(() => {
// 			clearPhoneNumber();
// 		}, 500);
// 	}
// }
//
//
// function searchPhoneNumber(phoneNumber) {
//
//
// 	fetch(`/api/search/?phone_number=${phoneNumber}`)
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error(`HTTP error! Status: ${response.status}`);
// 			}
// 			return response.json();
// 		})
// 		.then(data => {
//
// 			// 숫자 자판이 위로 올라가며 사라지는 코드 짜는중
// 			var pointModal = document.querySelector('.point-modal-window');
// 			var numberBoard = document.querySelector('.number-board');
// 			var pointCloseBtn = document.querySelector('.point-close-btn');
// 			var pointnSelectBox = document.querySelector('.point-select-box');
// 			var pointnSelectName = document.querySelector('.point-select-name');
// 			var resultContainer = document.querySelector('#result-container');
//
// 			// 'result' 키가 있는지 확인
// 			if ('result' in data && data.result !== 'null') {
//
// 				// 숫자 자판이 위로 올라는 코드
// 				pointModal.classList.add('hidden');
//
// 				// result 값을 쉼표로 분리하여 배열로 만듭니다
// 				const names = data.result.split(', ');
// 				const numberName = names.length;
//
// 				// 기존의 결과를 지우고, 새로 생성한 resultDiv를 추가합니다
// 				// 각 값을 요소박스에 넣어주고, resultDiv에 추가합니다
// 				names.forEach((name, index) => {
// 					const resultElement = document.createElement('div');
// 					resultElement.id = `result${index + 1}`;
// 					resultElement.className = 'result-name';
// 					resultElement.innerHTML = name;
//
// 					// 불러오는 이름 갯수에 따라 wrap을 부여하는 코드
//
// 					if (numberName % 2 === 0) {
// 						pointnSelectName.style.width = '54vw';
// 						if (numberName > 4) {
// 							pointnSelectName.style.width = '80vw';
// 						}
// 					} else {
// 						pointnSelectName.style.width = '80vw';
// 					}
//
// 					// 이름 선택시 함수 발동
// 					resultElement.onclick = function () {
// 						selectName(name);
// 					};
// 					setTimeout(function () {
// 						pointnSelectName.appendChild(resultElement);
// 						numberBoard.style.display = 'none'
// 						pointCloseBtn.style.display = 'none'
// 						pointnSelectBox.style.display = 'flex'
// 						resultContainer.style.display = 'none'
// 					}, 500)
// 				});
//
// 				setTimeout(function () {
// 					pointModal.classList.remove('hidden');
// 				}, 500)
//
// 			}
// 			// 'result' 키가 없거나 값이 'null'이면 모든 요소박스를 비워줍니다
// 			else {
// 				resultContainer.style.opacity = 0;
// 				setTimeout(function () {
// 					resultContainer.innerText = '다시 시도해주세요!^^';
// 					resultContainer.style.opacity = 1;
// 				}, 300)
// 				setTimeout(function () {
// 					resultContainer.style.opacity = 0;
// 				}, 1200)
// 				setTimeout(function () {
// 					resultContainer.innerText = '[회원번호 4자리 입력]';
// 					resultContainer.style.opacity = 1;
// 				}, 1500)
// 			}
// 		});
// }
//
// function closeNameSelectModal() {
// 	var pointModal = document.querySelector('.point-modal-window');
// 	var numberBoard = document.querySelector('.number-board');
// 	var pointCloseBtn = document.querySelector('.point-close-btn');
// 	var pointSelectBox = document.querySelector('.point-select-box');
// 	var pointnSelectName = document.querySelector('.point-select-name');
// 	var resultContainer = document.querySelector('#result-container');
//
// 	// 숫자 자판이 위로 올라는 코드
// 	pointModal.classList.add('hidden');
// 	setTimeout(function () {
// 		numberBoard.style.display = 'flex'
// 		pointCloseBtn.style.display = 'flex'
// 		pointSelectBox.style.display = 'none'
// 		pointnSelectName.innerHTML = ''
// 		resultContainer.style.display = 'flex'
// 		pointModal.classList.remove('hidden');
// 	}, 500)
// }
//
// function selectName(name) {
//
// 	var pointModal = document.querySelector('.point-modal-window');
// 	var numberBoard = document.querySelector('.number-board');
// 	var pointCloseBtn = document.querySelector('.point-close-btn');
// 	var pointSelectBox = document.querySelector('.point-select-box');
// 	var pointnSelectName = document.querySelector('.point-select-name');
// 	var resultContainer = document.querySelector('#result-container');
// 	var pointPay = document.querySelector('.point-pay');
// 	var pointPayUser = document.querySelector('.point-pay-user');
// 	var pointPayCurrentPoint = document.querySelector('.point-pay-current-point');
// 	var pointPaySettle = document.querySelector('.point-pay-settle');
//
// 	// 클릭 시 실행되어야 하는 함수 내용을 작성합니다
// 	fetch(`/api/select/?user_name=${name}`)
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error(`HTTP error! Status: ${response.status}`);
// 			}
// 			return response.json();
// 		})
//
//
// 		// 이름까지 선택시 발생하는 상황
// 		.then(data => {
// 			if ('result' in data) {
//
// 				// 먼저 window창을 위로 올림
// 				pointModal.classList.add('hidden');
//
// 				// views에서 가져온 현재 포인트
// 				const current_point = data.result.split(',').map(Number);
// 				console.log(current_point)
//
// 				// 작업을 끝내고 윈도우창을 내림
// 				setTimeout(function () {
// 					pointModal.classList.remove('hidden');
// 					pointSelectBox.style.display = 'none'
// 					pointPay.style.display = 'flex'
// 					pointPayUser.innerText = `[ ${name} ]`;
// 					pointPayCurrentPoint.innerText = current_point + '원';
// 					pointPaySettle.onclick = function () {
// 						finalPayment(name, current_point);
// 					};
// 					//그 과정에서 필요한 것들 + 환영하는 메세지와 결제후 남은 잔액
// 				}, 500)
// 			}
// 		})
// }
//
// function backPayment() {
// 	console.log('gg')
// 	var pointModal = document.querySelector('.point-modal-window');
// 	var pointSelectBox = document.querySelector('.point-select-box');
// 	var pointPay = document.querySelector('.point-pay');
//
// 	// 윈도우 창을 올림
// 	pointModal.classList.add('hidden');
//
// 	// 작업을 끝내고 윈도우창을 내림
// 	setTimeout(function () {
// 		pointModal.classList.remove('hidden');
// 		pointSelectBox.style.display = 'flex';
// 		pointPay.style.display = 'none'
// 	}, 500)
//
// }
//
// function finalPayment(name, current_point) {
// 	console.log('비동기로 db로 전송하는 코드 짜기')
// 	console.log(name, current_point)
//
// 	var pointModal = document.querySelector('.point-modal-window');
// 	var numberBoard = document.querySelector('.number-board');
// 	var pointCloseBtn = document.querySelector('.point-close-btn');
// 	var pointSelectBox = document.querySelector('.point-select-box');
// 	var pointnSelectName = document.querySelector('.point-select-name');
// 	var resultContainer = document.querySelector('#result-container');
// 	var pointPay = document.querySelector('.point-pay');
// 	var pointPayCurrentPoint = document.querySelector('.point-pay-current-point');
// 	var pointLast = document.querySelector('.point-last');
//
//
// 	// 윈도우 창을 올림
// 	pointModal.classList.add('hidden');
//
// 	// 작업을 끝내고 윈도우창을 내림
// 	setTimeout(function () {
// 		pointModal.classList.remove('hidden');
// 		pointPay.style.display = 'none'
// 		pointLast.style.display = 'flex'
// 	}, 500)
// }
//
// function payEnd() {
// 	var pointModalOverlay = document.querySelector('.point-modal-overlay');
// 	var pointModalWindow = document.querySelector('.point-modal-window');
// 	var pointLast = document.querySelector('.point-last');
// 	var numberBoard = document.querySelector('.number-board');
// 	var pointCloseBtn = document.querySelector('.point-close-btn');
// 	var resultContainer = document.querySelector('#result-container');
// 	var pointnSelectName = document.querySelector('.point-select-name');
//
//
// 	// 윈도우 창을 올림
// 	pointModalWindow.classList.add('hidden');
//
// 	// 이후에 한박자 느리게 오버레이가 사라진다.
// 	setTimeout(function () {
// 		pointModalOverlay.style.opacity = 0
// 	}, 300)
//
// 	// 이후에 가능장애가 없도록 display를 none으로 바꾸고 투명도도 다시 돌려놓고 클래스도 제거해준다.
// 	setTimeout(function () {
// 		pointLast.style.display = 'none';
// 		pointModalOverlay.style.display = 'none';
// 		pointModalOverlay.style.opacity = 1
// 		pointModalWindow.classList.remove('hidden')
// 		numberBoard.style.display = 'flex'
// 		pointCloseBtn.style.display = 'flex'
// 		resultContainer.style.display = 'flex'
// 		pointnSelectName.innerHTML = ''
// 	}, 500)
//
// }
//
// function orderData() {
//
// 	// 나중에 for문으로 대처한다.
// 	var orderContainer = document.querySelector('#order-container');
// 	var orderBox = orderContainer.children[0]
//
// 	// id값은 1의 자리인 경우 1으로 출력됨으로 앞에 0을 붙혀서 출력한다.
// 	var orderId = orderBox.querySelector('.order-id');
// 	var orderIdValue = parseInt(orderId.textContent); // 현재의 id 값을 정수로 변환합니다.
// 	var formattedOrderId = orderIdValue < 10 ? '0' + orderIdValue : orderIdValue;
//
//
// 	var orderDeg = orderBox.querySelector('.order-deg');
// 	var orderShot = orderBox.querySelectorAll('.order-shot');
//
//
// 	console.log(formattedOrderId)
// 	console.log(orderDeg.textContent)
// 	orderShot.forEach(function (shotElement) {
// 		console.log(shotElement.textContent);
// 	});
//
// }
