import { createSignal, onMount, onCleanup, Setter } from "solid-js";
import { Flow } from "../App";
import { DOMElement } from "solid-js/jsx-runtime";
import parseMaxWidth from "../utils/parseWidth";

export default function Input(props: {
    setFlow: Setter<Flow>;
    next: Flow;
    maxWidth?: string; 
}) {
    let ref: HTMLInputElement | undefined;
    let containerRef: HTMLDivElement | undefined;
    let measureRef: HTMLSpanElement | undefined;
    let caretRef: HTMLDivElement | undefined;

    const [input, setInput] = createSignal<string>("");
    const [caretPosition, setCaretPosition] = createSignal<number>(0);
    const [isFocused, setIsFocused] = createSignal<boolean>(false);

    const maxWidth = props.maxWidth || "80vw";

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

        if (measureRef && containerRef) {
            measureRef.textContent = value || "type here";
            const newWidth = Math.min(
                measureRef.offsetWidth + 10,
                parseMaxWidth(maxWidth, containerRef)
            );
            containerRef.style.width = `${newWidth}px`;

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

        caretRef.style.left = `${caretX}px`;
        caretRef.style.height = `${ref.offsetHeight * 0.7}px`;
        caretRef.style.top = `${
            (ref.offsetHeight - parseFloat(caretRef.style.height)) / 2
        }px`;
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

        const handleResize = () => {
            updateCaretPosition();
            // Re-evaluate max width on resize
            if (measureRef && containerRef) {
                const newWidth = Math.min(
                    measureRef.offsetWidth + 10,
                    parseMaxWidth(maxWidth, containerRef)
                );
                containerRef.style.width = `${newWidth}px`;
            }
        };

        window.addEventListener("resize", handleResize);
        onCleanup(() => window.removeEventListener("resize", handleResize));
    });

    return (
        <div
            class="relative inline-block overflow-hidden"
            ref={containerRef}
            style={{ "max-width": maxWidth }}
        >
            <input
                ref={ref}
                value={input()}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClick}
                class="text-[64px] outline-none font-bold placeholder:text-gray-300 w-full px-0 auto-expand-input"
                placeholder="type here"
                style={{ "caret-color": "transparent" }}
            />
            {/* Custom caret */}
            <div ref={caretRef} class="custom-caret"></div>
            {/* Hidden span to measure text width */}
            <span
                ref={measureRef}
                class="text-[64px] font-bold invisible absolute top-0 left-0 whitespace-pre pointer-events-none"
                aria-hidden="true"
            ></span>
        </div>
    );
}
