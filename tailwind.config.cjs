module.exports = {
    mode: 'jit',
    content: ['./src/**/*.svelte'],

    theme: {
        extend: {
            colors: {
                "primary": "var(--primary)",
                "black": "#000000",
            },
        }
    },
}