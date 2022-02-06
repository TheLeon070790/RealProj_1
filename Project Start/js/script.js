// "use strict";

window.addEventListener("DOMContentLoaded", () => {
    // LOADER
    const loader = document.querySelector(".loader");
    setTimeout(function() {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }, 2000);

    // TABS
    const headerParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabContents = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabContents.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabContents[i].classList.remove("hide");
        tabContents[i].classList.add("show");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    headerParent.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("tabheader__item")) {
            // console.log(e.target);
            tabs.forEach((item, i) => {
                if (e.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
                // console.log(item, i);
            });
        }
    });

    // MODAL
    const allModalBtn = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalClose = document.querySelector("[data-close]");

    allModalBtn.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    modalClose.addEventListener("click", closeModal);

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(timerModel);
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // const timerModel = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // DATE
    const deadline = "2022-02-28";

    function getTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / 1000 / 60) % 60),
            seconds = Math.floor((total / 1000) % 60);
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTime(endtime);
            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);
            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    // CLASS
    class CarCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 10500;
            this.exchangeToUsd();
        }

        exchangeToUsd() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");
            element.classList.add("menu__item");
            // if (this.classes.length === 0) {
            //     this.classes = "menu__item";
            //     element.classList.add(this.classes);
            // } else {
            //     this.classes.forEach((className) => element.classList.add(className));
            // }
            element.innerHTML = `
                
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">
                        ${this.descr}
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> $</div>
                    </div>
                
            `;
            this.parent.append(element);
        }
    }

    new CarCard(
        "img/tabs/1.jpg",
        "vegy",
        "2021 Mercedes-Benz C-Class",
        `The 2021 Mercedes-Benz C-Class finishes in the top half of our
            luxury small car rankings. It's powerful and upscale, but it
            has so-so handli...`,
        "199.000",
        ".menu .container"
    ).render();

    new CarCard(
        "img/tabs/4.jpg",
        "vegy",
        "2021 Mercedes-Benz CLA-Class",
        `The 2021 Mercedes-Benz CLA offers punchy powertrains,
            an elegant interior, and easy-to-use tech features,
            but it also has a firm ride and a ..`,
        "299.000",
        ".menu .container"
    ).render();

    new CarCard(
        "img/tabs/2.jpg",
        "vegy",
        "2021 Mercedes-Benz SCLA-Class",
        `The German luxury car-manufacturer has been around for more
            than a century, having elegantly drifted rough
            curves of automobile.`,
        "399.000",
        ".menu .container"
    ).render();

    // SLIDER FIRST WAY (EASY)
    // const slides = document.querySelectorAll(".offer__slide"),
    //     prev = document.querySelector(".offer__slider-prev"),
    //     next = document.querySelector(".offer__slider-next"),
    //     current = document.querySelector("#current"),
    //     total = document.querySelector("#total");

    // let slideIndex = 1;
    // show(slideIndex);

    // function show(s) {
    //     if (s > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (s < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => (item.style.cssText = "display: none"));
    //     slides[slideIndex - 1].style.display = "block";
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function sliderPlus(s) {
    //     show((slideIndex += 1));
    // }

    // prev.addEventListener("click", () => {
    //     sliderPlus(-1);
    // });

    // next.addEventListener("click", () => {
    //     sliderPlus(1);
    // });

    // SLIDER SECOND WAY - COROUSEL SLIDER
    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(".offer__slider-inner");

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    // console.log(width);
    slidesField.style.width = 100 * slides.length + "%";

    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = "relative";
    let indicator = document.createElement("ol"),
        dots = [];
    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicator);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin: 0 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: 0.5;
            transform: opacity 0.6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicator.append(dot);
        dots.push(dot);
    }

    next.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = 0.5));
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            //     offset = 0;
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = 0.5));
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            console.log(slideTo);
            slideIndex = slideTo;

            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach((dot) => (dot.style.opacity = 0.5));
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
});