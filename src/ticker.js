(function() {
	class ticker {
		state = {
			active: true,
			progress: 0,
			imagesLoaded: false
		};

		options = {
			el: document.querySelector("[data-ticker"),
			fps: 60,
			speed: "slow", // slow, medium, fast,
			width: 0
		};

		intervals = {
			movement: "",
			preload: ""
		};

		constructor(options) {
			if (typeof options === "object") {
				Object.keys(this.options).map(key => {
					if (this.options[key] && options[key]) {
						this.options[key] = options[key];
					}
				});
			}

			this.preLoadImages();
		}

		init() {
			this.duplicateSlides();
			this.calcMovementDistance();
			// this.hoverState();
			this.toggleMovement();
		}

		preLoadImages() {
			const slides = [...this.options.el.querySelectorAll(".ticker__slide img")];

			slides.map(el => {
				el.addEventListener("load", e => {
					this.state.imagesLoaded += 1;

					if (slides.length === this.state.imagesLoaded) {
						this.state.width = this.getSlidesWidth(slides);
						this.init();
						console.log(this);
					}
				});
			});
		}

		duplicateSlides() {
			[...this.options.el.querySelectorAll(".ticker__slide")].map(el => {
				this.options.el.querySelector(".ticker__slides").innerHTML += el.innerHTML;
			});
		}

		getSlidesWidth(slides) {
			this.options.width = slides.map(el => el.getBoundingClientRect().width).reduce((a, b) => a + b, 0);
			// this.options.el.querySelector(".ticker__viewport").style.maxWidth = this.options.width;
		}

		// getDataElements() {
		// 	[...document.querySelectorAll("[data-ticker")].map((el, id) => ({
		// 		id,
		// 		el,
		// 		options: e.dataSet.ticker
		// 	}));
		// }

		calcMovementDistance() {
			let { speed, fps } = this.options;

			switch (speed) {
				case "slow":
					speed = 1;
					break;
				case "medium":
					speed = 3;
					break;
				case "fast":
					speed = 5;
					break;
				default:
					break;
			}

			this.options.speed = (60 / fps) * speed;
		}

		hoverState() {
			document.addEventListener("mouseover", e => {
				let {
					el: { className: selector }
				} = this.options;

				if (e.target.matches(`.${selector}`) || !!e.target.closest(`.${selector}`)) {
					this.updateState("active", false) && this.toggleMovement();
				} else {
					this.updateState("active", true) && this.toggleMovement();
				}
			});
		}

		updateState(key, value) {
			// console.log(key, this.state[key], value);
			if (this.state[key]) this.state[key] = value;
			// console.log(this.state[key]);

			// if (this.state[name] !== value) {
			// 	return true;
			// }
			// return false;
		}

		toggleMovement() {
			const { speed, fps, width } = this.options;
			let { active } = this.state;

			if (active && speed && this.movement != 1) {
				this.intervals.movement = setInterval(() => {
					if (this.state.progress !== parseInt(width)) {
						this.state.progress += speed;
					} else {
						this.state.progress = 0;
					}
					this.updatePosition();
				}, parseInt(1000 / fps));
			} else {
				clearInterval(this.intervals.movement);
			}
		}

		updatePosition() {
			const { el } = this.options;
			const { progress } = this.state;
			el.querySelector(".ticker__slides").style.transform = `translate(-${progress}px)`;
		}
	}

	window.Ticker = ticker;
})(window);

ticking = new Ticker({ fps: 60 });
