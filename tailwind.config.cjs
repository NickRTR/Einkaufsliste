module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.svelte'],

    theme: {
        extend: {
            colors: {
                "bee": "#F6C90E",
                "marine": "#303841",
                "marine-bright": "#3A4750",
                "white": "#EEEEEE",
                "black": "#000000",
            },
        }
    },
}