

document.addEventListener('DOMContentLoaded', async () => {
    const checkbox = document.getElementById('enableSkipper');

    const settings = await browser.storage.local.get(['enableSkipper']);
    checkbox.checked = settings.enableSkipper ?? true;

    checkbox.addEventListener('change', async (e) => {
        await browser.storage.local.set({enableSkipper: e.target.checked});
    })
});

