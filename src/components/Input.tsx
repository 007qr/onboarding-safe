import { createSignal, onMount, onCleanup, Setter } from "solid-js";
import { Flow } from "../App";
import { DOMElement } from "solid-js/jsx-runtime";
import parseMaxWidth from "../utils/parseWidth";

export default function Input(props: {
    setFlow: Setter<Flow>;
    next: Flow;
    maxWidth?: string;
    fontSize?: string; // Add font size prop
}) {
    let ref: HTMLInputElement | undefined;
    let containerRef: HTMLDivElement | undefined;
    let measureRef: HTMLSpanElement | undefined;
    let caretRef: HTMLDivElement | undefined;

    const [input, setInput] = createSignal<string>("");
    const [caretPosition, setCaretPosition] = createSignal<number>(0);
    const [isFocused, setIsFocused] = createSignal<boolean>(false);

    // Set defaults if not provided
    const maxWidth = props.maxWidth || "364px";
    const fontSize = props.fontSize || "48px"; // Default font size set to 48px

    const handleKeyDown = (
        e: KeyboardEvent & {
            currentTarget: HTMLInputElement;
            target: DOMElement;
        }
    ) => {
        if (e.code === "Enter") {
            e.preventDefault();
            // TODO: validated email
            props.setFlow(props.next);
            ref?.blur(); // unfocus input
        }

        setTimeout(() => {
            if (ref) {
                setCaretPosition(ref.selectionStart || 0);
                updateCaretPosition();
            }
        }, 0);
    };

    const handleInput = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: DOMElement;
        }
    ) => {
        const value = (e.target as HTMLInputElement).value;
        setInput(value);

        // Update container width with max width constraint
        if (measureRef && containerRef) {
            measureRef.textContent = value || "type here";
            const newWidth = Math.min(
                measureRef.offsetWidth + 10,
                parseMaxWidth(maxWidth, containerRef)
            );
            containerRef.style.width = `${newWidth}px`;

            // If content exceeds max width, adjust scroll position
            if (
                ref &&
                measureRef.offsetWidth >
                    parseMaxWidth(maxWidth, containerRef) - 10
            ) {
                ref.scrollLeft = ref.scrollWidth - ref.clientWidth;
            }
        }

        if (ref) {
            setCaretPosition(ref.selectionStart || 0);
            updateCaretPosition();
        }
    };

    const updateCaretPosition = () => {
        if (!caretRef || !ref || !measureRef) return;

        ref.style.caretColor = "transparent";

        const textBeforeCaret = input().substring(0, caretPosition());
        measureRef.textContent = textBeforeCaret;
        let caretX = measureRef.offsetWidth;

        if (ref.scrollLeft > 0) {
            caretX -= ref.scrollLeft;
        }

        caretX = Math.max(0, Math.min(caretX, ref.clientWidth - 4));

        const fontSizeValue = parseInt(fontSize);
        const caretWidth = Math.max(4, Math.round(fontSizeValue / 12)); // Scale caret width with font size
        const caretHeight = Math.round(fontSizeValue * 0.9); // 70% of font size

        caretRef.style.width = `${caretWidth}px`;
        caretRef.style.left = `${caretX}px`;
        caretRef.style.height = `${caretHeight}px`;
        caretRef.style.top = `${(ref.offsetHeight - caretHeight) / 2}px`;
        caretRef.style.display = isFocused() ? "block" : "none";
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (caretRef) {
            caretRef.style.display = "block";
        }
        updateCaretPosition();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (caretRef) {
            caretRef.style.display = "none";
        }
    };

    const handleClick = () => {
        if (ref) {
            setCaretPosition(ref.selectionStart || 0);
            updateCaretPosition();
        }
    };

    onMount(() => {
        ref?.focus();
        setIsFocused(true);

        // Set initial container width with max width constraint
        if (measureRef && containerRef) {
            measureRef.textContent = "type here";
            const newWidth = Math.min(
                measureRef.offsetWidth + 10,
                parseMaxWidth(maxWidth, containerRef)
            );
            containerRef.style.width = `${newWidth}px`;
            containerRef.style.maxWidth = maxWidth;
        }

        if (ref) {
            setCaretPosition(ref.selectionStart || 0);
            updateCaretPosition();
        }
    });

    return (
        <div
            class="relative inline-block overflow-hidden"
            ref={containerRef}
            style={{
                "max-width": maxWidth,
                "mask-image":
                    "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.5) 2%,  black 5%,  black 95%,  rgba(0, 0, 0, 0.5) 98%,  transparent 100%)",
            }}
        >
            <input
                ref={ref}
                value={input()}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClick}
                class="outline-none font-bold placeholder:text-gray-300 w-full px-0 auto-expand-input"
                placeholder="type here"
                style={{
                    "caret-color": "transparent",
                    "font-size": fontSize,
                }}
            />
            {/* Custom caret */}
            <div ref={caretRef} class="custom-caret"></div>
            {/* Hidden span to measure text width */}
            <span
                ref={measureRef}
                class="invisible absolute top-0 left-0 whitespace-pre pointer-events-none font-bold"
                style={{ "font-size": fontSize }}
                aria-hidden="true"
            ></span>
        </div>
    );
}
