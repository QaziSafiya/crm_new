export const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    dateStyle: "short",
    timeStyle: "short"
});

export const postDateFormatter = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
});

export const currencyFormatter = new Intl.NumberFormat('en-IN', {
    currency: 'INR',
});