
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