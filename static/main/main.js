function scrollToCategory(category) {
    // 해당 카테고리 요소를 찾아서
    var idValue = category + '-' + 'scrollMove';
    var element = document.getElementById(idValue);

    // 해당 요소가 존재하면 스크롤 이동을 수행
    if (element) {
        element.scrollIntoView({behavior: 'smooth'});
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var scrollableDiv = document.getElementById("ktgr");
    var ktgry = document.querySelector('.kategoria-row');

    if (scrollableDiv) {
        // 0.1초 간격으로 스크롤을 감지하는 함수 호출
        setInterval(function () {

            // 스크롤 위치 가져오기
            var scrollPosition = scrollableDiv.scrollTop;
            var maxScrollHeight = scrollableDiv.scrollHeight - scrollableDiv.clientHeight;

            // 커피
            if (scrollPosition >= 0) {
                if (scrollPosition < maxScrollHeight * 0.36) {
                    ktgry.children[0].classList.add("selected");
                    ktgry.children[1].classList.remove("selected");
                    ktgry.children[2].classList.remove("selected");
                    ktgry.children[3].classList.remove("selected");
                }
            }

            // 논커피
            if (scrollPosition >= maxScrollHeight * 0.36) {
                if (scrollPosition < maxScrollHeight * 0.75) {
                    ktgry.children[1].classList.add("selected");
                    ktgry.children[2].classList.remove("selected");
                    ktgry.children[3].classList.remove("selected");
                    ktgry.children[0].classList.remove("selected");
                }
            }

            // 차
            if (scrollPosition >= maxScrollHeight * 0.75) {
                if (scrollPosition < maxScrollHeight - 16) {
                    ktgry.children[2].classList.add("selected");
                    ktgry.children[3].classList.remove("selected");
                    ktgry.children[0].classList.remove("selected");
                    ktgry.children[1].classList.remove("selected");
                }
            }

            // 음료수
            if (scrollPosition >= maxScrollHeight - 16) {
                ktgry.children[3].classList.add("selected");
                ktgry.children[2].classList.remove("selected");
                ktgry.children[1].classList.remove("selected");
                ktgry.children[0].classList.remove("selected");
            }
        }, 100); // 0.1초 간격 (100 밀리초)
    }
});

// 옥션은사실 옥션이 아닌 옵션이다.
function toggleOption(element, optionName) {

    // 재혁오빠가 짠 기존 코드
    var def_option = element.classList.contains('option-def');
    const allBoxes = document.querySelectorAll('.item-' + optionName);

    // 결과 출력

    if (def_option) {
        element.classList.add("option-def");
        element.classList.remove("option-not-selected");
        allBoxes.forEach(box => {
            if (box !== element) {
                box.classList.remove("option-selected");
            }
        });

    } else {
        element.classList.add("option-selected");
        allBoxes.forEach(box => {
            if (box !== element) {
                box.classList.add("option-not-selected");
            }
        });
    }


    // // 새로운 시도
    // var finaldefvalue = element.textContent.replace(/[\s\n\r]+/g, '')
    // console.log(finaldefvalue)
    // var fdv = Array.from(element.parentNode.children);
    //
    // if (finaldefvalue === '뜨겁게') {
    // 	fdv[0].classList.add("option-selected");
    // 	fdv[0].classList.remove("option-not-selected");
    // 	fdv[1].classList.add("option-not-selected");
    // 	fdv[1].classList.remove("option-selected");
    // } else {
    // 	fdv[1].classList.add("option-selected");
    // 	fdv[1].classList.remove("option-not-selected");
    // 	fdv[0].classList.add("option-not-selected");
    // 	fdv[0].classList.remove("option-selected");
    // }
}

// 옥션은사실 옥션이 아니라 옵션이다.
function openModal(id, category, name, en, price, img, deg, degNum, shot) {
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

function closeModal(id, category, name, en, price, img, deg, degNum, shot) {
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
    var menuQuantityElement = document.querySelector(`.modal-menu-quantity.${en}.${category}`);
    menuQuantityElement.innerText = 1;
    var OptionQuantityElements = document.querySelectorAll('.modal-option-quantity');
    OptionQuantityElements.forEach(function (element) {
        element.innerText = '0';
    })

    //
    var priceElement = document.querySelector(`.modal-menu-price.${en}.${category}`);
    priceElement.innerText = price + '원';

    // 옥션은사실
    document.querySelector('#' + 'orderModal' + '-' + en).querySelector('.chsnOrder').innerText = '';
}

function decreaseQuantity(cafeMenu, optionName, price) {
    var modals_minus = document.querySelector(`.${cafeMenu}.${optionName}`);

    // 버튼을 누를때마다 숫자가 위아래로 움직이는 코드
    modals_minus.style.transform = 'translateY(-0.4vh)';
    setTimeout(function () {
        modals_minus.style.transform = 'translateY(0vh)';
    }, 100);

    var quantityElement = document.querySelector(`.modal-menu-quantity.${cafeMenu}.${optionName}, .modal-option-quantity.${cafeMenu}.${optionName}`);
    var currentQuantity = quantityElement.textContent;
    // 가격을 바꿔주는 코드
    var priceElement = document.querySelector(`.modal-menu-price.${cafeMenu}.${optionName}`);

    // 수량이 1 이상일 때만 감소하도록 설정
    if (currentQuantity > 0) {
        currentQuantity--;
        quantityElement.innerText = currentQuantity;
        if (priceElement) {
            priceElement.innerText = currentQuantity * price + '원';
        }
    }
}

$(document).ready(function () {
    $(".modal-menu-item-counter").click(function () {
        $(".modal-menu-price").each(function (index, element) {
            var modals_plus = element;
            modals_plus.style.transform = 'translateY(-1.5vh)'; // 위로 이동하는 애니메이션
            setTimeout(function () {
                modals_plus.style.transform = 'translateY(0vh)'; // 원래 위치로 되돌리는 애니메이션
            }, 100);
        });
    });
});

function increaseQuantity(cafeMenu, optionName, price) {
    var modals_plus = document.querySelector(`.${cafeMenu}.${optionName}`);

    // 버튼을 누를때마다 숫자가 위아래로 움직이는 코드
    modals_plus.style.transform = 'translateY(-0.4vh)';
    setTimeout(function () {
        modals_plus.style.transform = 'translateY(0vh)';
    }, 100);

    var quantityElement = document.querySelector(`.modal-menu-quantity.${cafeMenu}.${optionName}, .modal-option-quantity.${cafeMenu}.${optionName}`);
    var currentQuantity = quantityElement.textContent;
    var priceElement = document.querySelector(`.modal-menu-price.${cafeMenu}.${optionName}`);

    // 여기에서는 별다른 제한 없이 증가하도록 설정
    currentQuantity++;
    console.log(currentQuantity)
    quantityElement.innerText = currentQuantity;
    if (priceElement) {
        priceElement.innerText = currentQuantity * price + '원';
    }
}

// 옥션은사실 새로운 orderAdd
//orderAdd의 기존 코드는 제이라움_(키오스크) > 코드일지(김민서) > 기존 function orderAdd에 백업되어있다.
function orderAdd(id, category, name, en, price, img, deg, degNum, shot, modal) {
    // 각종 정보를 저장하는 코드.
    var oadMdl = document.getElementById('orderModal' + '-' + en)
    console.log(deg)
    console.log(price)
    console.log(degNum)

    if (oadMdl.querySelector('.modal-option-items.샷추가')) {
        var oadMdlShot = oadMdl.querySelector('.modal-option-items.샷추가').children[0]
        var isShotAdded = oadMdlShot.classList.contains('option-not-selected')
        if (isShotAdded) {
            var oadShot = '투샷';
        } else {
            var oadShot = '없음';
        }
    } else {
        var oadMdlShot = '';
        var oadShot = 'nshot';
    }

    if (oadMdl.querySelector('.modal-option-items.온도')) {
        var oadMdlDeg = oadMdl.querySelector('.modal-option-items.온도').children[0]
        var isDegLowered = oadMdlDeg.classList.contains('option-not-selected')
        if (isDegLowered) {
            var oadDeg = '덜-뜨겁게';
        } else {
            var oadDeg = '뜨겁게';
        }
    } else {
        var oadMdlDeg = '';
        var oadDeg = 'ndeg';
    }

    if (oadMdl.querySelector('.modal-option-quantity.설탕시럽')) {
        if (oadMdl.querySelector('.modal-option-quantity.설탕시럽').textContent) {
            var oadSPmp = oadMdl.querySelector('.modal-option-quantity.설탕시럽').textContent.replace(/\s/g, '')
        }
    } else {
        var oadSPmp = 0
    }

    if (oadMdl.querySelector('.modal-option-quantity.바닐라시럽')) {
        if (oadMdl.querySelector('.modal-option-quantity.바닐라시럽').textContent) {
            var oadVPmp = oadMdl.querySelector('.modal-option-quantity.바닐라시럽').textContent.replace(/\s/g, '')
        }
    } else {
        var oadVPmp = 0
    }

    if (oadMdl.querySelector('.modal-option-quantity.카라멜시럽')) {
        if (oadMdl.querySelector('.modal-option-quantity.카라멜시럽').textContent) {
            var oadCPmp = oadMdl.querySelector('.modal-option-quantity.카라멜시럽').textContent.replace(/\s/g, '')
        }
    } else {
        var oadCPmp = 0
    }

    if (oadMdl.querySelector('.modal-option-quantity.아이스크림')) {
        if (oadMdl.querySelector('.modal-option-quantity.아이스크림').textContent) {
            var oadIcecrm = oadMdl.querySelector('.modal-option-quantity.아이스크림').textContent.replace(/\s/g, '')
        }
    } else {
        var oadIcecrm = 0
    }

    var oadQnt = oadMdl.querySelector('.modal-menu-quantity').textContent
    var oadPrc = parseInt(oadMdl.querySelector('.modal-menu-price').textContent.replace('원', ''), 10);

    // 옥션 클래스 네임을 위한 코드
    var oadOdrCss = 'order-swiper-container' + ' ' + en + ' ' + oadShot + ' ' + oadDeg + ' ' + 'sugar_' + oadSPmp + ' ' + 'vanilla_' + oadVPmp + ' ' + 'caramel_' + oadCPmp + ' ' + 'iceCream_' + oadIcecrm;

    // 옥션은사실 어쩌고저쩌고... 만일 단순 주문추가가 아닌 옵션변경이라면 반드시 기존 주문이 삭제되고 모달 정보를 바탕으로 새 주문이 추가될 것이다.
    var orderWithThisCssWillDeleted = document.querySelector('#' + 'orderModal' + '-' + en).querySelector('.chsnOrder').textContent
    if (orderWithThisCssWillDeleted) {
        document.querySelector('.' + orderWithThisCssWillDeleted).remove()
    }

    // 메뉴 중복을 확인하기 위해 기존 클래스명이 존재하는지 확인하는것!
    var isOrderDuplicated = document.querySelector('.' + oadOdrCss.replace(/ /g, '.')) !== null;

    // 메뉴가 중복인 경우 if, 아닌 경우 else if가 시행된다.
    if (isOrderDuplicated) {
        var rspBtn = document.querySelector('.' + oadOdrCss.replace(/ /g, '.')).querySelector('.order-quantity-btn')

        for (let i = 0; i < oadQnt; i++) {
            Ioqp(rspBtn);
        }

    } else if (oadQnt > 0) {
        const orderContainer = document.getElementById('order-container');
        const orderSwiperContainer = document.createElement('div');
        orderSwiperContainer.className = oadOdrCss;
        orderSwiperContainer.innerHTML = `
			<div class="order-swiper-box">
				<div class="order-box">
					<div class="order-optionBox"></div>
					<div class="order-item">
						<div class="order-item-left">
							<div class="order-name">${name}</div>
							<div class="order-back-data">
								<div class="order-id">${id}</div>                     
								<div class="order-deg">${degNum}</div>                     
								<div class="order-shot">${shot}</div>
								<div class="order-sugarPump">${oadSPmp}</div> 
								<div class="order-vanillaPump">${oadVPmp}</div> 
								<div class="order-caramelPump">${oadCPmp}</div> 
								<div class="order-iceCream">${oadIcecrm}</div>
								<div class="order-addshot">${oadShot}</div>
								<div class="order-lowdeg">${oadDeg}</div>
							</div>                                            
						</div>
						<div class="order-price order-price">${oadPrc}원</div>
						<div class="order-item-counter">
							<div class="material-symbols-outlined order-quantity-btn" onclick="Ioqm(this)">remove</div>
							<div class="order-quantity">${oadQnt}</div>
							<div class="material-symbols-outlined order-quantity-btn" onclick="Ioqp(this)">add</div>
						</div>
					</div>
				</div>
				<div id="changeOptionBtn"  class="order-option-change-btn" onclick="changeTheOption('${en}',this)"> 옵션변경 </div>
				<div class="order-delete-btn" onclick="orderDelete()"> 삭제 </div>
			</div>
		`;

        // 주문을 orderContainer에 추가하는 코드
        orderContainer.appendChild(orderSwiperContainer);

        // 옵션 타이틀 박스
        var optionBoxElement = orderSwiperContainer.querySelector('.order-optionBox');

        // 샷추가, 덜뜨겁게 옵션 타이틀 띄우기
        if (oadShot === 'nshot') {

        } else if (oadShot === '투샷') {
            const shotOpt = document.createElement('div')
            shotOpt.className = 'order-option ' + oadShot;
            shotOpt.innerText = oadShot;
            optionBoxElement.appendChild(shotOpt);
        }

        if (oadDeg === 'ndeg') {
            if (degNum === '1') {
                const degOpt = document.createElement('div')
                degOpt.className = 'order-cold-option ' + oadDeg;
                degOpt.innerText = '차갑게';
                optionBoxElement.appendChild(degOpt);
            }// 예그렇슴다!!! 좋아!! 그럼 믿고 맡겨 보겠다!! 이뿌니!! 화이팅! 나도 이제 내꺼 다시 하러 가볼겡!!굳굳!ㅃㅃ/예알겠슴다!
        } else if (oadDeg === '덜-뜨겁게') {
            const degOpt = document.createElement('div')
            degOpt.className = 'order-option ' + oadDeg;
            degOpt.innerText = oadDeg;
            optionBoxElement.appendChild(degOpt);
        } else if (oadDeg === '뜨겁게') {
            const degOpt = document.createElement('div')
            degOpt.className = 'order-option ' + oadDeg;
            degOpt.innerText = oadDeg;
            optionBoxElement.appendChild(degOpt);
        }

        // 시럽, 아이스크림의 수량 타이틀 띄우기
        if (oadSPmp > 0) {
            const sugarPump = document.createElement('div')
            sugarPump.className = 'sugarPump'
            sugarPump.innerText = '설탕: ' + oadSPmp;
            optionBoxElement.appendChild(sugarPump);
        }
        if (oadVPmp > 0) {
            const vanillaPump = document.createElement('div')
            vanillaPump.className = 'vanillaPump'
            vanillaPump.innerText = '바닐라: ' + oadVPmp
            optionBoxElement.appendChild(vanillaPump);
        }
        if (oadCPmp > 0) {
            const caramelPump = document.createElement('div')
            caramelPump.className = 'caramelPump'
            caramelPump.innerText = '카라멜: ' + oadCPmp
            optionBoxElement.appendChild(caramelPump);
        }
        if (oadIcecrm > 0) {
            const iceCream = document.createElement('div')
            iceCream.className = 'iceCream'
            iceCream.innerText = '크림: ' + oadIcecrm
            optionBoxElement.appendChild(iceCream);
        }
    }
}

function Ioqp(btn) {
    // 여기서 pE1은 +,-버튼과 수량표시란의 부모이다.
    var pE1 = btn.parentNode;
    var cE1 = Array.from(pE1.children);

    // 여기서 pE11은 가격표시란의 부모이다.
    var pE11 = pE1.parentNode;
    var cE11 = Array.from(pE11.children);
    if (cE1[1]) {
        var currentValue = parseInt(cE1[1].textContent, 10);
        if (currentValue) {
            cE1[1].innerText = currentValue + 1;
            // 현재 가격에서 '원'을 빼고 정수화. 여기서 cVcE11은 가격을 정수화한 값이다.
            var cVcE11 = parseInt(cE11[1].textContent.replace('원', ''), 10);
            console.log(cVcE11)
            if (cVcE11) {
                //  현재 값 + ( 현재 값 / 현재 수량 ) + '원' 으로 설정
                cE11[1].innerText = cVcE11 + cVcE11 / currentValue + '원'
            }
        }
    }
}

function Ioqm(btn) {
    var pE2 = btn.parentNode;
    var cE2 = Array.from(pE2.children);
    var pE22 = btn.parentNode.parentNode;
    var cE22 = Array.from(pE22.children);
    if (cE2[1]) {
        var currentValue = parseInt(cE2[1].textContent, 10);
        if (currentValue > 1) {
            cE2[1].innerText = currentValue - 1;
            // 현재 가격에서 '원'을 빼고 정수화
            var cVcE22 = parseInt(cE22[1].textContent.replace('원', ''), 10);
            if (cVcE22) {
                //  현재 가격 - ( 현재 가격 / 현재 수량 ) + '원' 으로 설정
                cE22[1].innerText = cVcE22 - cVcE22 / currentValue + '원'
            }
        }
    }
}

// 옥션은사실 옥션이 아니라 옵션이다.
function changeTheOption(en, opt) {
    var coptMdl = document.getElementById('orderModal' + '-' + en)

    var coptMdlShot = coptMdl.querySelector('.modal-option-items.샷추가')
    var coptMdlDeg = coptMdl.querySelector('.modal-option-items.온도')
    var coptMdlSPmp = coptMdl.querySelector('.modal-option-quantity.설탕시럽')
    var coptMdlVPmp = coptMdl.querySelector('.modal-option-quantity.바닐라시럽')
    var coptMdlCPmp = coptMdl.querySelector('.modal-option-quantity.카라멜시럽')
    var coptMdlIcecrm = coptMdl.querySelector('.modal-option-quantity.아이스크림')

    // 옥션은사실 orderAdd를 바꾸면서 coptShot, coptDeg도 건드렸다. 롤백할 때 참고.
    var coptShot = opt.parentNode.querySelector('.order-addshot').textContent.replace(/\s/g, '')
    var coptDeg = opt.parentNode.querySelector('.order-lowdeg').textContent.replace(/\s/g, '')
    var coptSPmp = opt.parentNode.querySelector('.order-sugarPump').textContent.replace(/\s/g, '')
    var coptVPmp = opt.parentNode.querySelector('.order-vanillaPump').textContent.replace(/\s/g, '')
    var coptCPmp = opt.parentNode.querySelector('.order-caramelPump').textContent.replace(/\s/g, '')
    var coptIcecrm = opt.parentNode.querySelector('.order-iceCream').textContent.replace(/\s/g, '')

    var coptMdlHdnInfo = coptMdl.querySelector('.chsnOrder');

    // 메뉴 수량
    document.getElementById('orderModal' + '-' + en).querySelector('.modal-menu-quantity').innerText = opt.parentNode.querySelector('.order-quantity').textContent.replace(/\s/g, '')

    // 메뉴 가격
    var currentMdlPrice = parseInt(document.getElementById('orderModal' + '-' + en).querySelector('.modal-menu-price').textContent.replace('원', ''), 10);
    document.getElementById('orderModal' + '-' + en).querySelector('.modal-menu-price').innerText = currentMdlPrice * document.getElementById('orderModal' + '-' + en).querySelector('.modal-menu-quantity').textContent + '원'

    // 옥션은사실 orderAdd를 바꾸면서 coptShot, coptDeg도 건드렸다. 롤백할 때 참고.
    // 샷추가 선택지
    if (coptMdlShot) {
        if (coptShot === '투샷') {
            toggleOption(coptMdlShot.children[1], en + '-' + '샷추가')
        } else if (coptShot === '없음') {
            toggleOption(coptMdlShot.children[0], en + '-' + '샷추가')
        }
    }

    // 옥션은사실 orderAdd를 바꾸면서 coptShot, coptDeg도 건드렸다. 롤백할 때 참고.
    // 뜨겁게-덜뜨겁게 선택지
    if (coptMdlDeg) {
        if (coptDeg === '덜-뜨겁게') {
            toggleOption(coptMdlDeg.children[1], en + '-' + '온도')
        } else if (coptDeg === '뜨겁게') {
            toggleOption(coptMdlDeg.children[0], en + '-' + '온도')
        }
    }

    // 설탕시럽 선택지
    if (coptMdlSPmp) {
        coptMdlSPmp.innerText = coptSPmp
    }

    // 바닐라시럽 선택지
    if (coptMdlVPmp) {
        coptMdlVPmp.innerText = coptVPmp
    }

    // 카라멜시럽 선택지
    if (coptMdlCPmp) {
        coptMdlCPmp.innerText = coptCPmp
    }

    // 아이스크림 선택지
    if (coptMdlIcecrm) {
        coptMdlIcecrm.innerText = coptIcecrm
    }

    var jewuh = opt.parentNode.parentNode
    var chosenOrder = Array.from(jewuh.classList).join('.');
    console.log(chosenOrder)
    coptMdlHdnInfo.innerText = chosenOrder;
    openModal('', '', '', en, '', '', '', '', '')
}


function orderDelete() {
    var clickedElement = event.target;
    var parentElement = clickedElement.parentNode;
    var grandparentElement = parentElement.parentNode;
    grandparentElement.remove();
}

function orderAllDelete() {
    var orderContainerElement = document.querySelector('.order-container')
    orderContainerElement.innerHTML = '';
}

function openPayModal() {
    var possible_num = document.querySelector('.order-total-quantity-num').textContent
    var payModalOverlay = document.querySelector('.pay-modal-overlay')
    var payModalWindow = document.querySelector('.pay-modal-window')
    if (possible_num > 0) {
        payModalOverlay.style.display = 'flex';

        // 할수 없지만 seTimeout이 없으면 애니메이션 효과가 적용되지 않는다??!!
        setTimeout(function () {
            payModalOverlay.classList.add('overlay-show');
            payModalWindow.classList.add('window-show');
        },); // 인덱스에 따라 딜레이를 조절합니다.
    }
}


function closePayModal() {
    var payModalOverlay = document.querySelector('.pay-modal-overlay')
    var payModalWindow = document.querySelector('.pay-modal-window')

    // 할수 없지만 seTimeout이 없으면 애니메이션 효과가 적용되지 않는다??!!
    setTimeout(function () {
        payModalOverlay.classList.remove('overlay-show');
        payModalWindow.classList.remove('window-show');
    },); // 인덱스에 따라 딜레이를 조절합니다.

    setTimeout(function () {
        payModalOverlay.style.display = 'none';
    }, 300)
}


function openCashModal() {
    var payModalOverlay = document.querySelector('.pay-modal-overlay')
    var payModalWindow = document.querySelector('.pay-modal-window')
    var cashModalOverlay = document.querySelector('.cash-modal-overlay')
    var cashModalWindow = document.querySelector('.cash-modal-window');
    var cashModalOrderNum = document.querySelector('.cash-modal-order-num');
    var cashModalWaitingNum = document.querySelector('.cash-waiting-number');

    $.ajax({
        url: '/orderList/',
        success: function (data) {
            // 성공적으로 데이터를 받았을 때 처리할 로직을 작성합니다.
            console.log(data);
            // 대기 인원을 넣어준다.
            cashModalWaitingNum.innerText = data.context.waiting_count;
            // 주문 번호를 넣어준다.
            cashModalOrderNum.innerText = data.context.order_person;
            orderData(data.context.order_person)
        },
        error: function (xhr, status, error) {
            // 요청이 실패했을 때의 처리를 작성합니다.
            console.error('Error:', error);
        }
    })


    // 결제방식 선택 창의 모션클래스를 제거하고 애니메이셔가 보이지 않게 즉시 display를 none으로 바꾼다.
    payModalWindow.classList.remove('window-show');
    payModalOverlay.style.backgroundColor = '#00000000'
    payModalOverlay.classList.remove('overlay-show');

    setTimeout(function () {
        payModalOverlay.style.display = 'none';
        payModalOverlay.style.backgroundColor = '#000000CC'
    }, 1000)


// 캐쉬모달을 화면 상단 밖으로 이동시킨다.
    cashModalWindow.classList.add('hidden')

// 이후에 즉시 캐쉬모달를 display = flex로 바꾼다.
    cashModalOverlay.style.display = 'flex'
    cashModalWindow.style.display = 'flex';

// 0.3초 뒤에 캐쉬윈도우를 아래로 이동시킨다.
    setTimeout(function () {
        cashModalWindow.classList.remove('hidden')
    }, 100)


}

function closeCashModal() {

    var cashModalOverlay = document.querySelector('.cash-modal-overlay')
    var cashModalWindow = document.querySelector('.cash-modal-window');

    // 캐쉬 윈도우가 먼거 올라간다.
    cashModalWindow.classList.add('hidden')

    // 이후에 한박자 느리게 오버레이가 사라진다.
    setTimeout(function () {
        cashModalOverlay.style.opacity = 0
    }, 300)

    // 이후에 가능장애가 없도록 display를 none으로 바꾸고 투명도도 다시 돌려놓고 클래스도 제거해준다.
    setTimeout(function () {
        cashModalOverlay.style.display = 'none';
        cashModalOverlay.style.opacity = 1
        cashModalWindow.classList.remove('hidden')
    }, 500)

}

function openPointModal() {
    var payModalOverlay = document.querySelector('.pay-modal-overlay')
    var payModalWindow = document.querySelector('.pay-modal-window')
    var pointModalOverlay = document.querySelector('.point-modal-overlay')
    var pointModalWindow = document.querySelector('.point-modal-window');


    // 결제방식 선택 창의 모션클래스를 제거하고 애니메이셔가 보이지 않게 즉시 display를 none으로 바꾼다.
    payModalWindow.classList.remove('window-show');
    payModalOverlay.style.backgroundColor = '#00000000'
    payModalOverlay.classList.remove('overlay-show');

    setTimeout(function () {
        payModalOverlay.style.display = 'none';
        payModalOverlay.style.backgroundColor = '#000000CC'
    }, 1000)


// 캐쉬모달을 화면 상단 밖으로 이동시킨다.
    pointModalWindow.classList.add('hidden')

// 이후에 즉시 캐쉬모달를 display = flex로 바꾼다.
    pointModalOverlay.style.display = 'flex'
    pointModalWindow.style.display = 'flex';

// 0.3초 뒤에 캐쉬윈도우를 아래로 이동시킨다.
    setTimeout(function () {
        pointModalWindow.classList.remove('hidden')
    }, 100)
}

function closePointModal() {
    var pointModalOverlay = document.querySelector('.point-modal-overlay')
    var pointModalWindow = document.querySelector('.point-modal-window')
    setTimeout(function () {
        clearPhoneNumber()
    }, 300)

    // 캐쉬모달을 화면 상단 밖으로 이동시킨다.
    pointModalWindow.classList.add('hidden')

    // 이후에 한박자 느리게 오버레이가 사라진다.
    setTimeout(function () {
        pointModalOverlay.style.opacity = 0
    }, 300)

    // 이후에 가능장애가 없도록 display를 none으로 바꾸고 투명도도 다시 돌려놓고 클래스도 제거해준다.
    setTimeout(function () {
        pointModalOverlay.style.display = 'none';
        pointModalOverlay.style.opacity = 1
        pointModalWindow.classList.remove('hidden')
    }, 500)
}

document.addEventListener("DOMContentLoaded", function () {
    // Mutation Observer 생성
    var observer = new MutationObserver(function (mutations) {
        // 메뉴 합계를 출력하는 코드
        var menuQuantityElements = document.querySelectorAll('.order-quantity');
        var quantitySum = 0;
        menuQuantityElements.forEach(function (element) {
            // 각 요소의 내용물(숫자) 가져오기
            var quantity = parseInt(element.innerText, 10);
            // 숫자가 NaN이 아닌 경우에만 더하기
            if (!isNaN(quantity)) {
                quantitySum += quantity;
            }
        });
        var menuPriceTotalElement = document.querySelector('.order-total-pay-price-num');
        var menuQuantityTotalElement = document.querySelector('.order-total-quantity-num')
        var orderPayBsox = document.querySelector('.order-pay-box')
        menuQuantityTotalElement.innerHTML = quantitySum

        var menuPriceElements = document.querySelectorAll('.order-price');
        var priceSum = 0;
        menuPriceElements.forEach(function (element) {
            // 각 요소의 내용물(문자열) 가져오기
            var priceText = element.innerText;
            // '원' 제거하고 숫자만 추출
            var priceNumber = parseInt(priceText.replace('원', ''), 10);
            // 숫자가 NaN이 아닌 경우에만 더하기
            if (!isNaN(priceNumber)) {
                priceSum += priceNumber;
            }
        });

        // 주문량이 1개 이상인 경우에는 버튼의 css를 활성화 시키는 코드
        if (quantitySum > 0) {
            orderPayBsox.classList.add('active')
            // 총 'n'잔 이라는 텍스트를 기입함
            menuPriceTotalElement.innerHTML = '합계:' + '&nbsp;&nbsp;&nbsp;' + priceSum + '&nbsp;' + '원';
        } else {
            orderPayBsox.classList.remove('active')
            // 주문량 0 인 경우 안내 메세지 출력
            menuPriceTotalElement.innerHTML = '주문 부탁드립니다!^^'
        }
    });
    // 감시 대상 요소 설정
    var targetNode = document.querySelector('.order-body'); // 또는 원하는 다른 노드로 변경
    // 감시할 변화 유형 설정
    var config = {attributes: true, childList: true, subtree: true};
    // Mutation Observer 시작
    observer.observe(targetNode, config);
});


let currentDigit = 1;

function appendNumber(number) {
    const digitInput = document.getElementById(`digit${currentDigit}`);
    digitInput.innerText = number;
    currentDigit = (currentDigit % 4) + 1;
    checkAndSubmit();
}

function clearPhoneNumber() {
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
    const phoneNumberInputs = Array.from({length: 4}, (_, i) => document.getElementById(`digit${i + 1}`).innerText);

    const hasValue = phoneNumberInputs.some(value => value.trim() !== '');

    const submitButton = document.getElementById('submitBtn');
    if (submitButton) {
        submitButton.disabled = !hasValue;
    }

    if (hasValue && currentDigit === 1) {
        const phoneNumber = phoneNumberInputs.join('');
        searchPhoneNumber(phoneNumber);
    }

    if (phoneNumberInputs.every(value => value.trim() !== '')) {
        setTimeout(() => {
            clearPhoneNumber();
        }, 500);
    }
}


function searchPhoneNumber(phoneNumber) {

    fetch(`/api/Phone_number_search/?phone_number=${phoneNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            // 숫자 자판이 위로 올라가며 사라지는 코드 짜는중
            var pointModal = document.querySelector('.point-modal-window');
            var numberBoard = document.querySelector('.number-board');
            var pointCloseBtn = document.querySelector('.point-close-btn');
            var pointnSelectBox = document.querySelector('.point-select-box');
            var pointnSelectName = document.querySelector('.point-select-name');
            var resultContainer = document.querySelector('#result-container');
            var pointModalHeader = document.querySelector('.point-modal-header');
            var pointPayUserText = document.querySelector('.point-pay-user-text');


            // 'result' 키가 있는지 확인
            if ('result' in data && data.result !== 'null') {

                // 숫자 자판이 위로 올라는 코드
                pointModal.classList.add('hidden');

                // result 값을 쉼표로 분리하여 배열로 만듭니다
                const names = data.result.split(', ');
                const numberName = names.length;

                // 기존의 결과를 지우고, 새로 생성한 resultDiv를 추가합니다
                // 각 값을 요소박스에 넣어주고, resultDiv에 추가합니다
                names.forEach((name, index) => {
                    const resultElement = document.createElement('div');
                    resultElement.id = `result${index + 1}`;
                    resultElement.className = 'result-name';
                    resultElement.innerHTML = name;

                    // 불러오는 이름 갯수에 따라 wrap을 부여하는 코드

                    if (numberName % 2 === 0) {
                        pointnSelectName.style.width = '54vw';
                        if (numberName > 4) {
                            pointnSelectName.style.width = '80vw';
                        }
                    } else {
                        pointnSelectName.style.width = '80vw';
                    }

                    // 이름 선택시 함수 발동
                    resultElement.onclick = function () {
                        selectName(name, phoneNumber);
                    };
                    setTimeout(function () {
                        pointnSelectName.appendChild(resultElement);
                        numberBoard.style.display = 'none'
                        pointCloseBtn.style.display = 'none'
                        pointnSelectBox.style.display = 'flex'
                        resultContainer.style.display = 'none'
                        pointModalHeader.style.display = 'none'
                        pointPayUserText.innerText = '_님 환영합니다!'
                    }, 500)
                });

                setTimeout(function () {
                    pointModal.classList.remove('hidden');
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

function closeNameSelectModal() {
    var pointModal = document.querySelector('.point-modal-window');
    var numberBoard = document.querySelector('.number-board');
    var pointCloseBtn = document.querySelector('.point-close-btn');
    var pointSelectBox = document.querySelector('.point-select-box');
    var pointnSelectName = document.querySelector('.point-select-name');
    var resultContainer = document.querySelector('#result-container');
    var pointModalHeader = document.querySelector('.point-modal-header');


    // 숫자 자판이 위로 올라는 코드
    pointModal.classList.add('hidden');
    setTimeout(function () {
        numberBoard.style.display = 'flex'
        pointCloseBtn.style.display = 'flex'
        pointSelectBox.style.display = 'none'
        pointnSelectName.innerHTML = ''
        resultContainer.style.display = 'flex'
        pointModalHeader.style.display = 'flex'
        pointModal.classList.remove('hidden');
    }, 500)
}

function selectName(name, phoneNumber) {

    var pointModal = document.querySelector('.point-modal-window');
    var numberBoard = document.querySelector('.number-board');
    var pointCloseBtn = document.querySelector('.point-close-btn');
    var pointSelectBox = document.querySelector('.point-select-box');
    var pointnSelectName = document.querySelector('.point-select-name');
    var resultContainer = document.querySelector('#result-container');
    var pointPay = document.querySelector('.point-pay');
    var pointPayUser = document.querySelector('.point-pay-user');
    var pointPayCurrentPoint = document.querySelector('.point-pay-current-point');
    var pointPayChargePoint = document.querySelector('.point-pay-charge-point');
    var totalPayPointElement = document.querySelector('.order-total-pay-price-num').textContent;
    var pointPaySettle = document.querySelector('.point-pay-settle');
    var pointPayUserText = document.querySelector('.point-pay-user-text');

    // 합계 ooo원에서 숫자만 출력해 내는 코드
    var totalPayPoint = totalPayPointElement.match(/\d+/g);

    // 클릭 시 실행되어야 하는 함수 내용을 작성합니다
    fetch(`/api/select/?user_name=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })


        // 이름까지 선택시 발생하는 상황
        .then(data => {
            if ('result' in data) {

                // 먼저 window창을 위로 올림
                pointModal.classList.add('hidden');

                // views에서 가져온 현재 포인트
                const current_point = data.result.split(',').map(Number);
                console.log('현재 잔액은 ' + current_point + '원이다.')

                // 작업을 끝내고 윈도우창을 내림
                setTimeout(function () {
                    pointModal.classList.remove('hidden');
                    pointSelectBox.style.display = 'none'
                    pointPay.style.display = 'flex'
                    pointPayUser.innerText = `${name}`;
                    pointPayCurrentPoint.innerText = current_point + '원';
                    pointPayChargePoint.innerText = '- ' + totalPayPoint + '원';
                    pointPayUserText.innerText = '_님 환영합니다!'

                    // 남은 포인트가 결제금액 보다 많은 경우
                    if (current_point - totalPayPoint >= 0) {
                        pointPaySettle.innerText = '결제하기';
                        pointPaySettle.onclick = function () {
                            orderData(name, phoneNumber, current_point, totalPayPoint);
                            finalPayment(name, phoneNumber, current_point, totalPayPoint);
                        };
                    }
                    // 포인트가 부족해서 결제가 안되는 경우
                    else {
                        pointPaySettle.innerText = '충전하기';
                        pointPaySettle.onclick = function () {
                            pointAdd_paying(name, phoneNumber, current_point, totalPayPoint)
                        };
                    }
                    //그 과정에서 필요한 것들 + 환영하는 메세지와 결제후 남은 잔액
                }, 500)
            }
        })
}


// 충전 관련버튼 *{ 충전하기 } * 버튼!
function pointAdd_paying(name, phoneNumber, current_point, totalPayPoint) {
    var pointModal = document.querySelector('.point-modal-window');
    var pointPay = document.querySelector('.point-pay');
    var pointAddContent = document.querySelector('.point-add-content');
    var pointAddCurrentPoint = document.querySelector('.point-add-currentPoint');
    var pointAddTotalPayPoint = document.querySelector('.point-add-totalPayPoint');
    var pointAddCheck = document.querySelector('.point-add-check');
    var pointAddInput = document.querySelector('.point-add-input');
    var pointAddClose = document.querySelector('.point-add-close');
    console.log('너는 지금 ' + current_point + '원이 있고 필요한 금액은 ' + totalPayPoint + '원이다.');
    // 그래 여기까진 문제없다구....ㅠㅠㅠㅠ


    // 먼저 윈도우를 올림
    pointModal.classList.add('hidden');

    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointPay.style.display = 'none'
        pointAddContent.style.display = 'flex'
        pointAddCurrentPoint.innerText = current_point
        pointAddTotalPayPoint.innerText = totalPayPoint
        pointAddInput.innerText = '얼마를 충전 할까요?'
        // 확인버튼에 온클릭 부여
        pointAddCheck.onclick = function () {
            // 결제를 하다가 포인트가 부족한 경우
            pointManager(name, phoneNumber, current_point, totalPayPoint)
            // 매니저를 선택하기만 하고 디스플레이를 출력하는건 따로 분리하는 작업이 필요하다!
        };
        // 결제중에 닫기를 누르는 경우
        pointAddClose.onclick = function () {
            pointAddClose_paying()
        };
    }, 500)
}


// 충전 관련버튼 *{ 충전하기 } * 버튼!
function pointAdd_complete_pay(name, phoneNumber, current_point, totalPayPoint) {
    var pointModal = document.querySelector('.point-modal-window');
    var pointPay = document.querySelector('.point-pay');
    var pointAddContent = document.querySelector('.point-add-content');
    var pointAddCurrentPoint = document.querySelector('.point-add-currentPoint');
    var pointAddTotalPayPoint = document.querySelector('.point-add-totalPayPoint');
    var pointAddCheck = document.querySelector('.point-add-check');
    var pointAddInput = document.querySelector('.point-add-input');
    var pointLast = document.querySelector('.point-last');
    var pointAddClose = document.querySelector('.point-add-close');


    // 먼저 윈도우를 올림
    pointModal.classList.add('hidden');

    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointLast.style.display = 'none'
        pointAddContent.style.display = 'flex'
        pointAddCurrentPoint.innerText = current_point
        pointAddTotalPayPoint.innerText = totalPayPoint
        pointAddInput.innerText = '얼마를 충전 할까요?'
        // 확인버튼에 온클릭 부여
        pointAddCheck.onclick = function () {
            // 결제를 다하고 추가로 충전을 원하는 경우
            pointManager(name, phoneNumber, current_point, totalPayPoint)
            // 매니저를 선택하기만 하고 디스플레이를 출력하는건 따로 분리하는 작업이 필요하다!
        };
        // 결제를 완료 하고 추가 충전에서 닫기를 누르는 경우
        pointAddClose.onclick = function () {
            pointAddClose_complete_pay()
        };
    }, 500)
}

function pointPushBtn(element) {
    const inputElement = document.querySelector('.point-add-input');

    //첫번째 오른쪽 첫 글자
    const lastChar = element.textContent.slice(-1);
    //두번째 오른쪽 첫 글자
    const SecondChar = element.textContent.slice(-2, -1);
    // 단위 확인
    var unit = lastChar === '천' ? 1000 : 10000
    // 5단위로 곱하기
    var PushMatch = SecondChar * unit
    // 글자가 적혀있는 경우에 숫자가 치환해버리고 조건값 부여
    if (inputElement.textContent.match(/\d+/g) === null) {
        inputElement.innerText = '0'
    }
    addNumberToInput(PushMatch);

    // 숫자를 적용하는 코드
    function addNumberToInput(PushMatch) {
        var inputValue = parseInt(inputElement.textContent.match(/\d+/g).join('')) || 0; // inputElement의 숫자 부분을 추출하여 정수로 변환
        var pushValue = parseInt(PushMatch) || 0; // PushMatch의 숫자 부분을 추출하여 정수로 변환
        var renew_inputValue = inputValue + pushValue; // 두 값의 합을 계산
        // ','를 추가한 값을 다시 입력 요소에 설정
        inputElement.textContent = addCommasToNumber(renew_inputValue);
    }

    // 입력된 숫자에 ','를 추가하는 함수
    function addCommasToNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// 버튼 클릭시 인풋에 적용되는 코드
document.addEventListener("DOMContentLoaded", function () {
    const numberButtons = document.querySelectorAll('.btn');
    const inputElement = document.querySelector('.point-add-input');

    // 숫자 버튼을 클릭했을 때 해당 숫자를 입력창에 추가하는 함수
    function addNumberToInput(number) {
        inputElement.textContent += number;
        // 입력된 값에서 숫자만 추출
        const inputValue = inputElement.textContent.replace(/\D/g, '');
        // ','를 추가한 값을 다시 입력 요소에 설정
        inputElement.textContent = addCommasToNumber(inputValue);
    }

    // 입력된 숫자에 ','를 추가하는 함수
    function addCommasToNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 숫자 버튼에 클릭 이벤트 리스너 추가
    numberButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log(inputElement.textContent.match(/\d+/g))
            if (inputElement.textContent.match(/\d+/g) === null) {
                inputElement.innerText = ''
            }
            const number = this.textContent.trim();
            addNumberToInput(number);
        });
    });
});

function pointPush(name, phoneNumber, current_point, totalPayPoint) {
    console.log('되나?')
    var inputElement = document.querySelector('.point-add-input');

    if (inputElement.textContent.match(/\d+/g) !== null) {
        // 숫자로 데이터형식을 바꾸고 합하여 데이터를 전송한다!\
        var point_push_value = parseInt(inputElement.textContent.replace(/,/g, ""), 10) + parseInt(current_point);

        $.ajax({
            url: '/final_payment/',
            data: JSON.stringify({
                name: name,
                phoneNumber: phoneNumber,
                newPoint: point_push_value
            }),
            method: "POST",
            processData: false,
            contentType: "application/json", // 수정
            success: function (data) {
                console.log('성공적으로 전송되었습니다.');
            },
            error: function (error) {
                console.log('전송 중 오류가 발생했습니다.');
            }
        });
    }
}

// 백스페이스바를 클릭시 전체 삭제 및 메세지 출력
function pointAddBackSpace() {
    const inputElement = document.querySelector('.point-add-input');
    inputElement.innerText = '얼마를 충전 할까요?'
}


// 포인트_충전 화면 닫기
function pointAddClose_paying() {
    var pointModal = document.querySelector('.point-modal-window');
    var pointPay = document.querySelector('.point-pay');
    var pointAddContent = document.querySelector('.point-add-content');
    var pointAddCurrentPoint = document.querySelector('.point-add-currentPoint');
    var pointAddTotalPayPoint = document.querySelector('.point-add-totalPayPoint');
    var pointAddCheck = document.querySelector('.point-add-check');

    // 먼저 윈도우를 올림
    pointModal.classList.add('hidden');

    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointPay.style.display = 'flex'
        pointAddContent.style.display = 'none'
        pointAddCurrentPoint.innerText = ''
        pointAddTotalPayPoint.innerText = ''
    }, 500)
}

function pointAddClose_complete_pay() {
    var pointModal = document.querySelector('.point-modal-window');
    var pointLast = document.querySelector('.point-last');
    var pointAddContent = document.querySelector('.point-add-content');
    var pointAddCurrentPoint = document.querySelector('.point-add-currentPoint');
    var pointAddTotalPayPoint = document.querySelector('.point-add-totalPayPoint');
    var pointAddCheck = document.querySelector('.point-add-check');

    // 먼저 윈도우를 올림
    pointModal.classList.add('hidden');

    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointLast.style.display = 'flex'
        pointAddContent.style.display = 'none'
        pointAddCurrentPoint.innerText = ''
        pointAddTotalPayPoint.innerText = ''
    }, 500)
}

function pointManager(name, phoneNumber, current_point, totalPayPoint) {

    var pointModal = document.querySelector('.point-modal-window');
    var pointManagerContent = document.querySelector('.point-manager-content');
    var pointAddContent = document.querySelector('.point-add-content');
    var inputElement = document.querySelector('.point-add-input');
    var chargeCancel = document.querySelector('.point-manager-cancel');
    const point_manager_header_message = document.querySelector('.point-manager-header-message');

    // 충전 금액
    var point_charge_value = parseInt(inputElement.textContent.replace(/,/g, ""), 10).toString()
    console.log(point_charge_value);


    // 먼저 윈도우를 올림
    pointModal.classList.add('hidden');

    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointAddContent.style.display = 'none'
        pointManagerContent.style.display = 'flex'
        point_manager_header_message.innerText = '--- 승인 받는중 ---'

        let fd_point = new FormData();

        fd_point.append('charge_status', '미승인');
        fd_point.append('client_name', name);
        fd_point.append('push_point', point_charge_value);
        fd_point.append('current_point', current_point);
        fd_point.append('password', phoneNumber)

        $.ajax({
            url: '/ManagerOrderData/',
            data: fd_point,
            method: "POST",
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('일단 데이터를 전송하긴함.');
                chargeCancel.onclick = function () {
                    point_charge_cancel(name, phoneNumber, current_point, totalPayPoint)
                    // 매니저를 선택하기만 하고 디스플레이를 출력하는건 따로 분리하는 작업이 필요하다!
                };
                // 재시도 횟수
                var retryCount = 0;
                // 최대 재시도 횟수
                var maxRetries = 100;
                // 재시도 간격 (밀리초)
                var retryInterval = 3000; // 3초

                // 재시도 함수
                function retryRequest() {
                    $.ajax({
                        url: '/ManagerCheck/',
                        data: fd_point,
                        method: 'POST',
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            if (data.charge_status === '승인') {
                                // 성공한 경우 처리
                                console.log('승인받음')
                                point_manager_header_message.innerText = '* 승인 완료 *'
                                setTimeout(function () {
                                    managerCheck(name, phoneNumber, current_point, totalPayPoint)
                                }, 500)
                            }
                        },
                        error: function (xhr, status, error) {
                            // 요청이 실패한 경우, 에러를 처리할 수 있습니다.
                            console.log('승인 받는중:', retryCount);

                            // 재시도 횟수 증가
                            retryCount++;

                            // 최대 재시도 횟수를 초과하지 않으면 다시 요청
                            if (retryCount < maxRetries) {
                                setTimeout(retryRequest, retryInterval);
                            }
                        }
                    });
                }

                // 초기 요청
                retryRequest();
            },
            error: function (error) {
                console.log('전송 중 오류가 발생했습니다.');
            }
        });
    }, 500)
}

function point_charge_cancel(name, phoneNumber, current_point, totalPayPoint) {

    var pointModal = document.querySelector('.point-modal-window');
    var pointManagerContent = document.querySelector('.point-manager-content');
    var pointPay = document.querySelector('.point-pay');
    var pointPayUserText = document.querySelector('.point-pay-user-text');
    var pointPayCurrentPoint = document.querySelector('.point-pay-current-point');
    var pointPaySettle = document.querySelector('.point-pay-settle');
    var inputElement = document.querySelector('.point-add-input');
    var pointLastBalanceNum = document.querySelector('.point-last-balance-num');
    var pointLast = document.querySelector('.point-last');
    var pointLastHeaderMessage = document.querySelector('.point-last-header-message');

    // 충전 금액
    var point_charge_value = parseInt(inputElement.textContent.replace(/,/g, ""), 10).toString()


    let fd_point_delete = new FormData();

    fd_point_delete.append('charge_status', '미승인');
    fd_point_delete.append('client_name', name);
    fd_point_delete.append('push_point', point_charge_value);
    fd_point_delete.append('current_point', current_point);

    $.ajax({
        url: '/ManagerDelete/',
        data: fd_point_delete,
        method: "POST",
        processData: false,
        contentType: false,
        success: function (data) {
            console.log('데이터를 삭제함.');
            // 이후에 디스플레이 대한 css 작업을 해야함
        },
        error: function (error) {
            console.log('전송 중 오류가 발생했습니다.');
        }
    });

    if (pointLastBalanceNum.textContent.trim() === '') {
        console.log('아직 걸재전')
        setTimeout(function () {
            pointModal.classList.remove('hidden');
            pointManagerContent.style.display = 'none'
            pointPay.style.display = 'flex'
            pointPayUserText.innerText = '_님 환영합니다!'
            pointPayCurrentPoint.innerText = current_point + '원'

            pointPaySettle.innerText = '충전하기';
            pointPaySettle.onclick = function () {
                pointAdd_paying(name, phoneNumber, current_point, totalPayPoint)
            };

        }, 500)
    } else {
        console.log('결제 이후 추가로 충전요구')
        setTimeout(function () {
            pointModal.classList.remove('hidden');
            pointManagerContent.style.display = 'none'
            pointLast.style.display = 'flex'
            pointLastHeaderMessage.innerText = '주문이 완료 되었습니다!'
        }, 500)

    }
}

// 이름 선택시 발동되는 함수 ** 데이터만 전송시키는 코드와 display를 분리한다.
function managerCheck(name, phoneNumber, current_point, totalPayPoint, manager) {

    var pointModal = document.querySelector('.point-modal-window');
    var pointManagerContent = document.querySelector('.point-manager-content');
    var pointAddContent = document.querySelector('.point-add-content');
    var pointAddCheck = document.querySelector('.point-add-check');
    var pointPay = document.querySelector('.point-pay');
    var pointPayUserText = document.querySelector('.point-pay-user-text');
    var pointPayCurrentPoint = document.querySelector('.point-pay-current-point');
    var inputElement = document.querySelector('.point-add-input');
    var pointPaySettle = document.querySelector('.point-pay-settle');
    var pointPayCurrentText = document.querySelector('.point-pay-current-text');
    var pointLastBalanceNum = document.querySelector('.point-last-balance-num');
    var pointCompleteContent = document.querySelector('.point-complete-content');
    var pointLast = document.querySelector('.point-last');
    var pointLastHeaderMessage = document.querySelector('.point-last-header-message');

    // 충전 금액
    var point_charge_value = parseInt(inputElement.textContent.replace(/,/g, ""), 10)

    // 충전된 금액 Number(inputElement.textContent.replace(/,/g, "")) + Number(current_point)
    // 또는 Number(current_point)
    // 원본 parseInt(inputElement.textContent.replace(/,/g, ""), 10); + parseInt(current_point)
    var point_push_value = Number(inputElement.textContent.replace(/,/g, "")) + Number(current_point)
    console.log(parseInt(inputElement.textContent.replace(/,/g, ""), 10))
    console.log(parseInt(current_point))

    console.log(Number(inputElement.textContent.replace(/,/g, "")) + Number(current_point))
    // 결제 후 충전된 금액
    var point_charge_pay_value = parseInt(pointLastBalanceNum.textContent.replace(/,/g, ""), 10);
    +parseInt(inputElement.textContent.replace(/,/g, ""), 10)


    // 먼저 윈도우를 올림
    pointModal.classList.add('hidden');


    console.log(pointLastBalanceNum.textContent.trim())
    // 결제가 다 이루워지고 결제 후 남은 금액의 요소가 비어있는 경우 다시 결제를 진행하고 비어있지 아니한다면 결제 마무리
    if (pointLastBalanceNum.textContent.trim() === '') {
        console.log('아직 걸재전')
        setTimeout(function () {
            pointModal.classList.remove('hidden');
            pointManagerContent.style.display = 'none'
            pointPay.style.display = 'flex'
            pointPayUserText.innerText = '_님 충전완료 되었습니다!'
            pointPayCurrentPoint.innerText = point_push_value + '원'
            console.log('되는게 맞나?')

            // 남은 포인트가 결제금액 보다 많은 경우
            if (point_push_value - totalPayPoint >= 0) {
                pointPaySettle.innerText = '결제하기';
                pointPaySettle.onclick = function () {
                    orderData(name, phoneNumber, current_point, totalPayPoint);
                    finalPayment(name, phoneNumber, current_point, totalPayPoint);
                };
            }
            // 포인트가 부족해서 결제가 안되는 경우
            else {
                pointPaySettle.innerText = '충전하기';
                pointPaySettle.onclick = function () {
                    pointAdd_paying(name, phoneNumber, current_point, totalPayPoint)
                };
            }
        }, 500)
    } else {
        console.log('결제 이후 추가로 충전요구')
        setTimeout(function () {
            pointModal.classList.remove('hidden');
            pointManagerContent.style.display = 'none'
            pointLast.style.display = 'flex'
            pointLastHeaderMessage.innerText = '충전이 완료 되었습니다!'
            pointLastBalanceNum.innerText = (point_charge_value + point_charge_pay_value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'
        }, 500)
    }
}

function backPayment() {
    console.log('gg')
    var pointModal = document.querySelector('.point-modal-window');
    var pointSelectBox = document.querySelector('.point-select-box');
    var pointPay = document.querySelector('.point-pay');

    // 윈도우 창을 올림
    pointModal.classList.add('hidden');

    // 작업을 끝내고 윈도우창을 내림
    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointSelectBox.style.display = 'flex';
        pointPay.style.display = 'none'
    }, 500)

}


function finalPayment(name, phoneNumber, current_point, totalPayPoint) {

    var pointModal = document.querySelector('.point-modal-window');
    var pointPay = document.querySelector('.point-pay');
    var pointLast = document.querySelector('.point-last');
    var pointLastBalance = document.querySelector('.point-last-balance-num');
    var pointWaitingNumber = document.querySelector('.point-waiting-number');
    var pointPayCurrentPoint = document.querySelector('.point-pay-current-point');
    var pointRechargeBtn = document.querySelector('.point-recharge-btn');


    // 마지막 주문완료에서 대기인원을 출력해주는 코드!
    $.ajax({
        url: '/orderList/',
        success: function (data) {
            // 성공적으로 데이터를 받았을 때 처리할 로직을 작성합니다.
            console.log(data);
            // 대기 인원을 넣어준다.
            pointWaitingNumber.innerText = data.context.waiting_count;
        },
        error: function (xhr, status, error) {
            // 요청이 실패했을 때의 처리를 작성합니다.
            console.error('Error:', error);
        }
    })

    // 잔여 포인트
    var balance_point = pointPayCurrentPoint.textContent.match(/\d+/g);

    // 보유 포인트 - 결제 금액
    var pointLastBalanceNum = balance_point - totalPayPoint
    // 잔여금액으로 표기하기
    pointLastBalance.innerText = pointLastBalanceNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'

    // 윈도우 창을 올림
    pointModal.classList.add('hidden');

    // 작업을 끝내고 윈도우창을 내림
    setTimeout(function () {
        pointModal.classList.remove('hidden');
        pointPay.style.display = 'none'
        pointLast.style.display = 'flex'
        pointRechargeBtn.onclick = function () {
            pointAdd_complete_pay(name, phoneNumber, current_point, totalPayPoint)
        };
    }, 500)

    console.log(name)
    console.log(phoneNumber)
    console.log(pointLastBalanceNum)
    // 서버에 POST 요청을 보냄
    $.ajax({
        url: '/final_payment/',
        data: JSON.stringify({
            name: name,
            phoneNumber: phoneNumber,
            newPoint: pointLastBalanceNum
        }),
        method: "POST",
        processData: false,
        contentType: "application/json", // 수정
        success: function (data) {
            console.log('성공적으로 전송되었습니다.');
        },
        error: function (error) {
            console.log('전송 중 오류가 발생했습니다.');
        }
    });

}

function payEnd() {
    var pointModalOverlay = document.querySelector('.point-modal-overlay');
    var pointModalWindow = document.querySelector('.point-modal-window');
    var pointLast = document.querySelector('.point-last');
    var numberBoard = document.querySelector('.number-board');
    var pointCloseBtn = document.querySelector('.point-close-btn');
    var resultContainer = document.querySelector('#result-container');
    var pointnSelectName = document.querySelector('.point-select-name');
    var pointModalHeader = document.querySelector('.point-modal-header');
    var pointLastBalanceNum = document.querySelector('.point-last-balance-num');


    // 윈도우 창을 올림
    pointModalWindow.classList.add('hidden');

    // 이후에 한박자 느리게 오버레이가 사라진다.
    setTimeout(function () {
        pointModalOverlay.style.opacity = 0
    }, 300)

    // 이후에 가능장애가 없도록 display를 none으로 바꾸고 투명도도 다시 돌려놓고 클래스도 제거해준다.
    setTimeout(function () {
        pointLast.style.display = 'none';
        pointModalOverlay.style.display = 'none';
        pointModalOverlay.style.opacity = 1
        pointModalWindow.classList.remove('hidden')
        numberBoard.style.display = 'flex'
        pointCloseBtn.style.display = 'flex'
        resultContainer.style.display = 'flex'
        pointModalHeader.style.display = 'flex'
        pointnSelectName.innerHTML = ''
        pointLastBalanceNum.innerHTML = ''
    }, 500)
}

// 옥션은사실 옥션이 아니라 옵션이다.
function orderData(order_person, phoneNumber) {
    console.log(order_person)
    // container에 있는 모든 box요소를 돌린다.
    var orderContainer = document.querySelector('#order-container');
    var childCount = orderContainer.childElementCount;


    var order_list = []

    for (var i = 0; i < childCount; i++) {
        var orderBox = orderContainer.children[i]

        // 메뉴의 수량을 가져오는 코드
        var menu_quantity = parseInt(orderBox.querySelector('.order-quantity').textContent, 10)
        var formatted_menu_quantity = menu_quantity < 10 ? '0' + menu_quantity : menu_quantity

        // id값은 1의 자리인 경우 1으로 출력됨으로 앞에 0을 붙혀서 출력한다.
        var orderId = orderBox.querySelector('.order-id');
        var orderIdValue = parseInt(orderId.textContent); // 현재의 id 값을 정수로 변환합니다.
        var formattedOrderId = orderIdValue < 10 ? '0' + orderIdValue : orderIdValue;

        // hot은 "0"으로 cold는 "1"로 표기한다.
        var orderDeg = orderBox.querySelector('.order-deg');

        // 필요한 샷의 수량을 표기한다.
        var orderShot = orderBox.querySelector('.order-shot');

        // 추가한 샷의 수량을 표기한다.
        var orderAddShotElement = orderBox.querySelector('.투샷');
        var orderAddShot = orderAddShotElement ? 1 : 0;

        // 선택한 온도를 표기한다.
        var orderSelectDegElement = orderBox.querySelector('.덜-뜨겁게');
        var orderLessHot = orderSelectDegElement ? 1 : 0;

        // 선택한 얼음양을 표기한다.
        var orderSelectIceElement = orderBox.querySelector('.적게');
        var orderLessCold = orderSelectIceElement ? 1 : 0;

        // 설탕시럽의 수량을 표기한다.
        var sugarPump = orderBox.querySelector('.order-sugarPump').textContent;

        // 설탕시럽의 수량을 표기한다.
        var vanillaPump = orderBox.querySelector('.order-vanillaPump').textContent;

        // 설탕시럽의 수량을 표기한다.
        var caramelPump = orderBox.querySelector('.order-caramelPump').textContent;

        // 설탕시럽의 수량을 표기한다.
        var iceCream = orderBox.querySelector('.order-iceCream').textContent;

        // 수량 id, deg, shot_num, add_shot, hot, cold, sugar, vanilla, caramel
        var order_item = `J-${formatted_menu_quantity}${formattedOrderId}${orderDeg.textContent}${orderShot.textContent}${orderAddShot}${orderLessHot}${orderLessCold}${sugarPump}${vanillaPump}${caramelPump}${iceCream}`
        // db로 이동할 list형식으로 만들기
        order_list.push(order_item);
    }
    // 오더 리스트
    console.log(order_list)

    // 총 주문 수량 가져오기.
    var total_quantity = document.querySelector('.order-total-quantity-num').textContent

    // 주문자 이름 가져오기
    var order_nameElement = document.querySelector('.point-pay-user')

    // 주문자 번호 가져오기
    var phone_number = phoneNumber

    // 주문자가 공백을 트림 시키고 변수를 저장한다
    if (order_nameElement.textContent.trim() === '') {
        var order_name = order_person
    } else {
        var order_name = order_nameElement.textContent.trim();
    }

    // 주문 상태 부여하기
    var order_status = '대기'

    // 총 결제 금액 가져오기
    var total_price = document.querySelector('.order-total-pay-price-num').textContent.match(/\d+/g);


    let fd = new FormData();

    fd.append('order_name', order_name);
    fd.append('phone_number', phone_number);
    fd.append('total_quantity', total_quantity);
    fd.append('total_price', total_price);
    fd.append('order_status', order_status);
    fd.append('order_menu', order_list);
    console.log('제발')
    console.log(order_name, phone_number, total_quantity)
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
    console.log('되랏!')
    setTimeout(function () {
        // 메뉴 전체 초기화
        orderContainer.innerHTML = ''

        // 선택자 이름 초기화
        order_nameElement.innerHTML = ''
    }, 500)

}


document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, false);

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 150) {
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