(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 7 * 1000; //7 giây
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $(".wheel");
	const wheelBall = $(".wheel__ball");
	const btnWheel = $(".btn--spin");
	const showMsg = $(".msg");

	//=====< Danh sách phần thưởng >=====
	const listGift = [
		{
			text: "Chúc bạn may mắn",
			percent: 10 / 100,
		},
		{
			text: "1.000.000 VNĐ",
			percent: 10 / 100,
		},
		{
			text: "Chúc bạn may mắn",
			percent: 5 / 100,
		},
		{
			text: "Vé 7-Minute Stage",
			percent: 5 / 100,
		},
		{
			text: "1.000.000 VNĐ",
			percent: 5 / 100,
		},
		{
			text: "Vé 7-Minute Stage",
			percent: 40 / 100,
		},
		{
			text: "1.000.000 VNĐ",
			percent: 10 / 100,
		},
		{
			text: "Vé 7-Minute Stage",
			percent: 20 / 100,
		},
	];

	//=====< Số lượng phần thưởng >=====
	const size = listGift.length;

	//=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
	const rotate = 360 / size;
	const numBall = 20;
	const rotateBall = 360 / numBall;
	const radius = 142;

	//=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
	const skewY = 90 - rotate;

	listGift.map((item, index) => {
		let imageSource = "";
		if (item.text === "1.000.000 VNĐ") {
			imageSource = "./images/ico_money.png";
		} else if (item.text === "Chúc bạn may mắn") {
			imageSource = "./images/ico_lucky.png";
		} else {
			imageSource = "./images/ico_ticket.png";
		}
		//=====< Tạo thẻ li >=====
		const elm = document.createElement("li");

		//=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
		elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

		//=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
		if (index % 2 == 0) {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-[10px] flex flex-col items-center">
      <small class='text-red-600'>${item.text}</small>
      <br/>
      <img src="${imageSource}" width="20" />
    </p>`;
		} else {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-[10px] flex flex-col items-center">
    <small class='text-red-600'>${item.text}</small>
    <br/>
      <img src="${imageSource}" width="20" />
    </p>`;
		}

		//=====< Thêm vào thẻ ul >=====
		wheel.appendChild(elm);
	});

	// Tạo list ball
	// Array(18)
	// 	.fill(1)
	// 	.map((item, index) => {
	// 		const elmBall = document.createElement("li");
	// 		elmBall.style.transform = `rotate(${rotateBall * index}deg)`;
	// 		elmBall.style.width = "10px";
	// 		elmBall.style.height = "10px";
	// 		elmBall.style.position = "absolute";
	// 		elmBall.classList.add("item__ball");
	// 		wheelBall.appendChild(elmBall);
	// 	});
	Array(numBall)
		.fill(1)
		.map((item, index) => {
			const elmBall = document.createElement("li");
			const angle = rotateBall * index;
			const x = radius * Math.cos((angle * Math.PI) / 180);
			const y = radius * Math.sin((angle * Math.PI) / 180);

			elmBall.style.width = "14.75px";
			elmBall.style.height = "15.75px";
			elmBall.style.position = "absolute";
			elmBall.style.left = `calc(50% + ${x + 0.95}px - 8px)`; // 50% là trung tâm, -5px để điều chỉnh kích thước phần tử (10px / 2)
			elmBall.style.top = `calc(50% + ${y + 1}px - 8px)`; // 50% là trung tâm, -5px để điều chỉnh kích thước phần tử (10px / 2)
			elmBall.classList.add("item__ball");
			wheelBall.appendChild(elmBall);
		});
	/********** Hàm bắt đầu **********/
	const start = () => {
		showMsg.innerHTML = "";
		isRotating = true;
		//=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
		const random = Math.random();

		//=====< Gọi hàm lấy phần thưởng >=====
		const gift = getGift(random);

		//=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
		currentRotate += 360 * 10;

		//=====< Gọi hàm quay >=====
		rotateWheel(currentRotate, gift.index);

		//=====< Gọi hàm in ra màn hình >=====
		showGift(gift);
	};

	/********** Hàm quay vòng quay **********/
	const rotateWheel = (currentRotate, index) => {
		$(".wheel").style.transform = `rotate(${
			//=====< Góc quay hiện tại trừ góc của phần thưởng>=====
			//=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};

	const rotateWheelBall = (currentRotate, index) => {
		$(".wheel__ball").style.transform = `rotate(${
			//=====< Góc quay hiện tại trừ góc của phần thưởng>=====
			//=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};

	/********** Hàm lấy phần thưởng **********/
	const getGift = (randomNumber) => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			//=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
			currentPercent += item.percent;

			//=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});

		//=====< Phần thưởng đầu tiên trong danh sách là phần thưởng quay được>=====
		return list[0];
	};

	/********** In phần thưởng ra màn hình **********/
	const showGift = (gift) => {
		let timer = setTimeout(() => {
			isRotating = false;

			// showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
			Swal.fire({
				title: `Chúc mừng bạn đã quay vào ô "${gift.text}"`,
				icon: "success",
				confirmButtonText: "OK",
			});
			clearTimeout(timer);
		}, timeRotate);
	};

	/********** Sự kiện click button start **********/
	btnWheel.addEventListener("click", () => {
		!isRotating && start();
	});
})();
