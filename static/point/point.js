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


			// 'result' 키가 있는지 확인
			if ('result' in data && data.result !== 'null') {

				// 숫자 자판이 위로 올라는 코드
				point_body.classList.add('hidden');

				setTimeout(function () {
					point_body.classList.remove('hidden');
					number_board.style.display = 'none'
					point_board.style.display = 'flex'
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
