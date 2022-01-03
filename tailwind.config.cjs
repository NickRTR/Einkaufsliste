module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.svelte'],

    theme: {
        extend: {
            colors: {
                "primary": "var(--primary)",
                "black": "#000000",
            },
        }
    },
}