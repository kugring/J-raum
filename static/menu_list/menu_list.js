function menu_edit() {
	var menu_edit = document.querySelector('.menu-list-container-edit')
	var menu_view = document.querySelector('.menu-list-container-view')
	var main_select_btn = document.querySelector('.menu-main-select-btn')
	var edit_select_btn = document.querySelector('.menu-edit-select-btn')

	menu_edit.style.display = 'flex'
	menu_view.style.display = 'none'
	edit_select_btn.style.display = 'flex'
	main_select_btn.style.display = 'none'
}

function menu_edit_cancel() {
	window.location.href = "/Menu_list/";

}


function updateMenu(button) {
	var row = button.parentNode.parentNode;
	var menu_id = row.querySelector('.menu-id').textContent;
	var category = row.querySelector('.menu-category').value;
	var name = row.querySelector('.menu-name').value;
	var price = row.querySelector('.menu-price').value;
	var shot = row.querySelector('.menu-shot').value;
	var options = row.querySelector('.menu-options').value;
	var img = row.querySelector('.menu-img').value;
	var deg = row.querySelector('.menu-deg').value;

	$.ajax({
		url: '/MenuUpdate/',
		type: 'POST',
		data: {
			menu_id: menu_id,
			category: category,
			name: name,
			price: price,
			shot: shot,
			options: options,
			img: img,
			deg: deg
		},
		success: function (response) {
			// 업데이트 성공 시 처리할 코드
			console.log('메뉴가 업데이트되었습니다.');
		},
		error: function (xhr, status, error) {
			// 오류 발생 시 처리할 코드
			console.error('메뉴 업데이트 중 오류가 발생했습니다:', error);
		}
	});
	window.location.href = "/Menu_list/";
}


function menu_add() {
	var menu_view = document.querySelector('.menu-list-container-view')
	var menu_add = document.querySelector('.menu-list-container-add')
	var main_select_btn = document.querySelector('.menu-main-select-btn')
	var add_select_btn = document.querySelector('.menu-add-select-btn')


	menu_view.style.display = 'none'
	main_select_btn.style.display = 'none'
	menu_add.style.display = 'flex'
	add_select_btn.style.display = 'flex'
}

function menu_add_cancel() {
	window.location.href = "/Menu_list/";
}

function menu_add_submit() {
	var category = document.getElementById("category").value;
	var name = document.getElementById("name").value;
	var price = document.getElementById("price").value;
	var shot = document.getElementById("shot").value;
	var deg = document.getElementById("deg").value;
	var options = document.getElementById("options").value;
	var img = document.getElementById("img").value;

	// 수집한 데이터 출력
	console.log("category:", category);
	console.log("name:", name);
	console.log("price:", price);
	console.log("shot", shot);
	console.log("deg:", deg);
	console.log("options:", options);
	console.log("img:", img);
	if (category && name && price && deg && img) {

		$.ajax({
			url: '/MenuAppend/', // 데이터를 업데이트하는 뷰의 URL
			type: 'POST',
			data: {
				category: category,
				name: name,
				price: price,
				shot: shot,
				deg: deg,
				options: options,
				img: img,
			},
			success: function (response) {
				// 업데이트가 성공한 경우 처리할 내용
				console.log('데이터가 업데이트되었습니다.');

			},
			error: function (xhr, status, error) {
				// 오류가 발생한 경우 처리할 내용
				console.error('데이터 업데이트 중 오류가 발생했습니다:', error);
			}
		});
	}
	window.location.href = "/Menu_list/";
}


document.addEventListener('touchmove', function (event) {
	if (event.scale !== 1) {
		event.preventDefault();
	}
}, false);

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
	var now = (new Date()).getTime();
	if (now - lastTouchEnd <= 300) {
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