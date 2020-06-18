export default async ({app}) => {
    window.addEventListener("message", function (event) {
        const data = event.data;
        const action = data.action;
        if (action === 'closeWidget') {
            const url = window.location.href;
            window.history.pushState({}, '', url.split('#/profitbase')[0]);
        }
    });
}