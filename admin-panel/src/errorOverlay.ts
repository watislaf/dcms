// @ts-ignore
const showErrorOverlay = (err: any) => {
    const ErrorOverlay = customElements.get('vite-error-overlay');

    if (!ErrorOverlay) {
        return;
    }

    const overlay = new ErrorOverlay(err);
    document.body.appendChild(overlay);
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason));
