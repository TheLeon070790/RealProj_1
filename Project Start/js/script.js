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

    const timerModel = setTimeout(openModal, 5000);

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
    const deadline = "2022-02-06";

    function getTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 24),
            seconds = Math.floor((total / 1000) % 24);
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
});