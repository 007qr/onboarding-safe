const parseMaxWidth = (maxWidth: string, containerRef: HTMLDivElement | undefined): number => {
    if (maxWidth.endsWith("px")) {
        return parseInt(maxWidth);
    } else if (maxWidth.endsWith("vw")) {
        const percentage = parseInt(maxWidth) / 100;
        return window.innerWidth * percentage;
    } else if (maxWidth.endsWith("rem")) {
        const fontSize = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        );
        return parseInt(maxWidth) * fontSize;
    } else if (maxWidth.endsWith("em")) {
        const fontSize = parseFloat(
            getComputedStyle(containerRef || document.body).fontSize
        );
        return parseInt(maxWidth) * fontSize;
    }
    return parseInt(maxWidth) || window.innerWidth * 0.8; // Default to 80% of viewport
};

export default parseMaxWidth;
