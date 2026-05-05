export function initMenu() {
    console.log('ok')
    document.addEventListener("DOMContentLoaded", () => {
        const toggleBtn = document.querySelector(".menu__toggle");
        const menuList = document.querySelector(".menu__list");
        const dropdownButtons = document.querySelectorAll(".menu__button");

        toggleBtn.addEventListener("click", () => {
            toggleBtn.classList.toggle("menu__toggle--is-active");
            menuList.classList.toggle("menu__list--is-active");
        });

        dropdownButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    const parentItem = btn.closest(".menu__item");

                    document.querySelectorAll(".menu__item").forEach((item) => {
                        if (item !== parentItem) item.classList.remove("menu__item--is-open");
                    });

                    parentItem.classList.toggle("menu__item--is-open");
                    e.stopPropagation();
                }
            });
        });
    });
}
