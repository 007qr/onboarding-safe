import { JSX } from "solid-js/jsx-runtime";

export default function Button({children}:{children: JSX.Element}) {
    let ref: HTMLButtonElement | undefined;
    return (
        <>
            <button class="text-white w-max font-inter active:scale-95 transition duration-100 ease-in-out py-[10px] px-[20px] text-[13px] font-medium leading-[130%] tracking-wide rounded-4xl bg-gradient-to-r from-[#8350f2] to-[#4379f3]">
                {children}
            </button>
        </>
    )
}