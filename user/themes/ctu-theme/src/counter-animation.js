const animationDuration = 2000;

const startCounter = (el) => {
    const target = +el.textContent;
    const countStep = target / (animationDuration / 16);
    let currentStep = 0;

    const updateCount = () => {
        currentStep += countStep;
        if (currentStep < target) {
            el.innerText = Math.floor(currentStep);
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target;
        }
    };
    updateCount();
};

// Wrap the observer logic in an exported function
export function initCounters() {
    if (!document.querySelector('body.page-home')) {
        return 0;
    }

    const elements = document.querySelectorAll('body>dl>dd');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(num => observer.observe(num));
}
