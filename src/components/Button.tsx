import { DOMElement, JSX } from "solid-js/jsx-runtime";

export default function Button({
    children,
    onClick,
}: {
    children: JSX.Element;
    onClick?: (
        e: MouseEvent & {
            currentTarget: HTMLButtonElement;
            target: DOMElement;
        }
    ) => void;
}) {
    let ref: HTMLButtonElement | undefined;
    return (
        <>
            <button
                onclick={onClick}
                class="text-white w-max font-inter active:scale-95 transition duration-100 ease-in-out py-[10px] px-[20px] text-[13px] font-medium leading-[130%] tracking-wide rounded-4xl bg-gradient-to-r from-[#8350f2] to-[#4379f3]"
            >
                {children}
            </button>
        </>
    );
}
