(() => {
	const getRandomInt = (min, max) =>
		Math.floor(
			Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min),
		);
	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	let value = 1;

  const startMiddleEndTest = document.getElementById('startMiddleEndTest')

  setInterval(() => {
    value += 1;
		if (value === 100) {
			value = 0;
		}
    const animatedTest = document.getElementById("animatedTest");
    animatedTest.setAttribute("progress", value);
    document.getElementById("animated").innerText = value;
    startMiddleEndTest.setAttribute("progress", value);
  }, 100);

  let start = getRandomColor()
  let middle = getRandomColor()
  let end = getRandomColor()
  startMiddleEndTest.setAttribute('start', start)
  startMiddleEndTest.setAttribute('middle', middle)
  startMiddleEndTest.setAttribute('end', end)
  document.getElementById('start').innerText = start
  document.getElementById('middle').innerText = middle
  document.getElementById('end').innerText = end

  const heightTest = document.getElementById("heightTest");
  let height = getRandomInt(5, 50);
  const progressTest = document.getElementById("progressTest");
  let progress = getRandomInt(1, 100);
  progressTest.setAttribute("progress", progress);
  document.getElementById("progress").innerText = progress;


  setInterval(() => {
		height = getRandomInt(5, 50);
		heightTest.setAttribute("height", height);
		document.getElementById("height").innerText = height;

		progress = getRandomInt(1, 100);
		progressTest.setAttribute("progress", progress);
		document.getElementById("progress").innerText = progress;

    
    start = getRandomColor()
    middle = getRandomColor()
    end = getRandomColor()
    startMiddleEndTest.setAttribute('start', start)
    startMiddleEndTest.setAttribute('middle', middle)
    startMiddleEndTest.setAttribute('end', end)
    document.getElementById('start').innerText = start
    document.getElementById('middle').innerText = middle
    document.getElementById('end').innerText = end
    
	}, 10000);
})();
