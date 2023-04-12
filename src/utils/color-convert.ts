export const getLightnessFromHex = (hex: string): number => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let l, r, g, b;

    r = 0;
    g = 0;
    b = 0;

    if (result) {
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
    }

    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    l = (max + min) / 2;

    l = l * 100;
    l = Math.round(l);

    return l;
};
