export function initTitleParallax() {

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const wrapper = document.querySelector('.home-title');
        const title = document.querySelector('.home-title__content');

        if (scrolled < window.innerHeight) {
            requestAnimationFrame(() => {
                // Двигаем текст вверх
                const yPos = scrolled * 0.5;
                title.style.transform = `translateY(-${yPos}px)`;

                // Вычитаем это же расстояние из нижней границы контейнера.
                // Следующий блок будет "втягиваться" в освободившееся место.
                wrapper.style.marginBottom = `-${yPos}px`;
            });
        }
    });

}
