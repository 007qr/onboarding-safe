import { Component, createEffect, createSignal, For, onCleanup, Show } from "solid-js";
import lerpColor from "./utils/lerp";

const App: Component = () => {
    const firstLine = "Hey👋 You're new here.";
    const secondLine = "Let's get you setup!";
    const [inputText, setInputText] = createSignal<string>('');

    // create Effect for Bg blur Animation
    createEffect(() => {
        const steps = [
            // step1
            [
                "hsla(50, 99%, 55%, 0.54)",
                "hsla(0, 100%, 57%, 0.58)",
                "hsla(18, 100%, 49%, 0.8)",
            ],
            // step2
            [
                "hsla(191, 47%, 71%, 0.67)",
                "hsla(170, 99%, 65%, 0.42)",
                "hsla(58, 81%, 62%, 0.72)",
            ],
            // step3
            [
                "hsla(169, 98%, 77%, 0.4)",
                "hsla(194, 100%, 50%, 0.3)",
                "hsla(186, 91%, 81%, 0.2)",
            ],
            // step4
            [
                "hsla(22, 80%, 90%, 1)",
                "hsla(46, 92%, 90%, 1)",
                "hsla(46, 92%, 90%, 1)",
            ],
            // step5
            [
                "hsla(288, 99%, 64%, 0.24)",
                "hsla(259, 94%, 65%, 0.3)",
                "hsla(187, 94%, 65%, 0.2)",
            ],
            // step6
            [
                "hsla(20, 14%, 79%, 1)",
                "hsla(12, 88%, 90%, 1)",
                "hsla(12, 88%, 90%, 1)",
            ],
        ];

        let currentStep = 0;
        let progress = 0;
        const duration = 200; // frames per transition
        let animationFrameId: number;

        function animate() {
            const div = document.getElementById(
                "blur-bg-effect-animation"
            ) as HTMLDivElement;
            if (!div) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const nextStep = (currentStep + 1) % steps.length;
            const t = progress / duration;

            const [start1, start2, start3] = steps[currentStep];
            const [end1, end2, end3] = steps[nextStep];

            const bg1 = lerpColor(start1, end1, t);
            const bg2 = lerpColor(start2, end2, t);
            const bg3 = lerpColor(start3, end3, t);

            div.style.background = `linear-gradient(
          to top,
          ${bg1} 32%,
          ${bg2} 60%,
          ${bg3} 100%
      )`;

            progress++;
            if (progress >= duration) {
                progress = 0;
                currentStep = nextStep;
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        // Clean up animation frame when component unmounts
        onCleanup(() => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    });

    return (
        <>
            <div class="z-10 relative flex flex-col gap-8 h-screen justify-center w-full max-w-lg mx-auto">
                <div>
                    <h2 class="text-[48px] text-balance font-semibold leading-tight text-black/80 tracking-tighter">
                        <span class="sr-only">
                            Hey👋 You're new here. Let's get you setup!
                        </span>
                        <For each={Array.from(firstLine.split(" "))}>
                            {(el, index) => (
                                <>
                                    <span
                                        class="whitespace-pre inline-block animate-fade-in"
                                        style={{
                                            "animation-delay": `${
                                                (index() + 1) * 100
                                            }ms`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {el}
                                    </span>
                                    <span
                                        class="whitespace-pre inline-block animate-fade-in"
                                        style={{
                                            "animation-delay": `${
                                                (index() + 1) * 100
                                            }ms`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {" "}
                                    </span>
                                </>
                            )}
                        </For>
                        <br />
                        <For each={Array.from(secondLine.split(" "))}>
                            {(el, index) => (
                                <>
                                    <span
                                        class="whitespace-pre inline-block animate-fade-in"
                                        style={{
                                            "animation-delay": `${
                                                (index() + 5) * 100
                                            }ms`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {el}
                                    </span>
                                    <span
                                        class="whitespace-pre inline-block animate-fade-in"
                                        style={{
                                            "animation-delay": `${
                                                (index() + 5) * 100
                                            }ms`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {" "}
                                    </span>
                                </>
                            )}
                        </For>
                    </h2>
                </div>
                <div class="text-2xl leading-tight tracking-tighter fade-in [animation-delay:0.8s]">
                    <p>Let's get your account ready.</p>
                    <p>Enter your name.</p>
                </div>
                <div class="fade-in [animation-delay:1s] rounded-[22px] drop-shadow-lg font-inter">
                    <div class="relative">
                        <input
                            type="text"
                            value={inputText()}
                            on:input={(e) => {setInputText(e.target.value)}}
                            placeholder="Your name"
                            class="pl-[12px] outline-none leading-[110%] tracking-normal w-full p-3 border-2 rounded-4xl border-gray-300 bg-[#f5f5f5]"
                        />
                        <Show when={inputText().length > 0}>
                            <button class="absolute top-[6px] right-[12px] cursor-pointer rounded-full bg-black w-[32px] h-[32px] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M17.073 12.5H5.5q-.213 0-.357-.143T5 12t.143-.357t.357-.143h11.573l-3.735-3.734q-.146-.147-.152-.345t.152-.363q.166-.166.357-.168t.357.162l4.383 4.383q.13.13.183.267t.053.298t-.053.298t-.183.268l-4.383 4.382q-.146.146-.347.153t-.367-.159q-.16-.165-.162-.354t.162-.354z"/></svg>
                            </button>
                        </Show>
                    </div>
                    {/* <div class="leading-relaxed p-3 border-2 border-b-0 rounded-t-[22px] border-gray-300">
                        <label class="text-gray-600 block text-sm font-inter">Your name</label>
                        <input type="text" class="outline-none focus:outline-none font-inter" value="Vish Vadlamani" placeholder=""/>
                    </div>
                    <div class="leading-relaxed p-3 border-2 rounded-b-[22px] border-gray-300 flex justify-between items-center">
                        <div class="">
                            <label class="text-gray-600 block text-sm font-inter">Mobile number</label>
                            <input type="tel" class="outline-none focus:outline-none font-inter" value="+1 555 555 5556" placeholder=""/>
                        </div>
                        <button class="cursor-pointer rounded-full bg-black w-[32px] h-[32px] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M17.073 12.5H5.5q-.213 0-.357-.143T5 12t.143-.357t.357-.143h11.573l-3.735-3.734q-.146-.147-.152-.345t.152-.363q.166-.166.357-.168t.357.162l4.383 4.383q.13.13.183.267t.053.298t-.053.298t-.183.268l-4.383 4.382q-.146.146-.347.153t-.367-.159q-.16-.165-.162-.354t.162-.354z"/></svg>
                        </button>
                    </div> */}
                </div>
            </div>
            <div
                class="w-screen blur-[109px] h-screen flex items-center justify-center fixed top-0 left-0 z-0 pointer-events-none"
                style="animation-duration:30s;will-change:transform"
            >
                <div
                    id="blur-bg-effect-animation"
                    class="w-[100vh] h-[100vh] sm:w-[150vh] sm:h-[150vh] md:w-[150vh] md:h-[150vh] lg:w-screen lg:h-[150vh] absolute bottom-1/4 left-1/2 -translate-x-1/2"
                    style="will-change: background; mask-image: radial-gradient(circle, black 30%, transparent 80%);"
                ></div>
            </div>
        </>
    );
};

export default App;
