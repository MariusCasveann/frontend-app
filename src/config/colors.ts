export const nightblue = '#0c3d8a';
export const lightNightblue = '#859ec4';
export const grey = '#D8DADA';
export const skyblue = '#487ebd';
export const oceanblue = '#007898';
export const lightOceanblue = '#7fbbcb';
export const stoneblue = '#58737a';
export const lightStoneblue = '#92aab1';
export const vanilla = '#eee7a5';
export const lemon = '#f1e364';
export const orange = '#f8b100';
export const rose = '#dcaeb9';
export const cerise = '#ad405a';
export const sand = '#d9d4b9';
export const oak = '#a19351';
export const brown = '#886b22';
export const clay = '#7d7a58';
export const khaki = '#564e02';
export const mint = '#c1dfc4';
export const avocado = '#7dab6e';
export const turquoise = '#65ba88';
export const lushgreen = '#008d3a';
export const algae = '#36542c';
export const forestgreen = '#263428';

export const colors = [
    nightblue,
    lightNightblue,
    grey,
    skyblue,
    oceanblue,
    lightOceanblue,
    stoneblue,
    lightStoneblue,
    vanilla,
    lemon,
    orange,
    rose,
    cerise,
    sand,
    oak,
    brown,
    clay,
    khaki,
    mint,
    avocado,
    lushgreen,
    algae,
    forestgreen
];

export const dynamicColors = (colorIndex: number) => {
    const result = colors[colorIndex];
    return result;
};
