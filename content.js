const observerOptions = {
    childList: true, subtree: true
};

let bodyObserver = null;

function startSkipObserver() {

    if (bodyObserver) return;

    bodyObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (!(node instanceof HTMLElement)) return;

                const skipButton = node.querySelector('.skip__button');

                if (!skipButton) return;

                setTimeout(() => {
                    try {
                        skipButton.click();
                    } catch (error) {
                        console.warn(error)
                    }
                }, 800);

                try {
                    skipButton.querySelector('span').innerHTML = "Skipping...";
                } catch (error) {
                    console.warn(error);
                }
            });
        });
    });
    bodyObserver.observe(document.body, observerOptions);
}

function stopSkipObserver() {
    if (bodyObserver) {
        bodyObserver.disconnect();
        bodyObserver = null;
    }
}

browser.storage.onChanged.addListener(changes => {
    if (changes.enableSkipper) {
        if (changes.enableSkipper.newValue) {
            startSkipObserver();
        } else {
            stopSkipObserver();
        }
    }
});

window.addEventListener('load', () => {
    console.log('Loaded');

    browser.storage.local.get(['enableSkipper'], ({enableSkipper}) => {
        if (enableSkipper ?? true) {
            startSkipObserver();
        }
    });
});
