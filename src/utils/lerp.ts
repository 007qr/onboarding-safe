export default function lerpColor(start: string, end: string, t: number): string {
    const parseHSLA = (hsla: string) =>
        hsla
            .match(/[\d.]+/g)
            ?.map(Number) ?? [0, 0, 0, 1];

    const [h1, s1, l1, a1] = parseHSLA(start);
    const [h2, s2, l2, a2] = parseHSLA(end);

    const lerp = (a: number, b: number) => a + (b - a) * t;

    return `hsla(${lerp(h1, h2)}, ${lerp(s1, s2)}%, ${lerp(l1, l2)}%, ${lerp(a1, a2)})`;
}