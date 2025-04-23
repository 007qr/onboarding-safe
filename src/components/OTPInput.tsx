import { createSignal, For, onMount, Setter, Show } from "solid-js";
import { Flow } from "../App";

export default function OTPInput(props: { setFlow: Setter<Flow>; next: Flow }) {
    let containerRef: HTMLDivElement | undefined;
    let inputRefs: HTMLInputElement[] = [];

    let [otp, setOtp] = createSignal(new Array(6).fill(""));

    onMount(() => {
        containerRef?.focus();
    });

    return (
        <>
            <div
                ref={containerRef}
                onkeydown={(e) => {
                    e.stopPropagation();
                    console.log(e.code);
                }}
                class="w-[364px] text-xl font-bold h-[120px] border-[#1e1e2029] border rounded-[16px] flex gap-[48px] items-center justify-center"
            >
                <For each={otp()}>
                    {(_, index) => (
                        <div class="relative w-8 h-10 flex items-center justify-center">
                            <input
                                ref={(el) => {
                                    inputRefs[index()] = el;
                                }}
                                value={otp()[index()]}
                                class={`absolute w-full h-full outline-none border-none text-center border transition-opacity ${
                                    otp()[index()]
                                        ? "opacity-100 z-10"
                                        : "opacity-0 z-0"
                                }`}
                                autofocus={index() === 0}
                                onInput={(e) => {
                                    const newOtp = [...otp()];
                                    newOtp[index()] =
                                        e.currentTarget.value.slice(0, 1);
                                    setOtp(newOtp);

                                    if (
                                        e.currentTarget.value &&
                                        index() < inputRefs.length - 1
                                    ) {
                                        inputRefs[index() + 1]?.focus();
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Backspace" &&
                                        !otp()[index()]
                                    ) {
                                        inputRefs[index() - 1]?.focus();
                                    }
                                }}
                            />

                            {/* Circle shows when input is empty, clicking it focuses the input */}
                            <Show when={!otp()[index()]}>
                                <div
                                    class="absolute w-full h-full flex items-center justify-center z-10"
                                    onClick={() => inputRefs[index()]?.focus()}
                                >
                                    <Circle />
                                </div>
                            </Show>
                        </div>
                    )}
                </For>
            </div>
        </>
    );
}

const Circle = () => {
    return (
        <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="4" cy="4" r="4" fill="#1D1D1F" />
        </svg>
    );
};
