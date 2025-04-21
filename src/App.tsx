import { Component, For } from "solid-js";

const App: Component = () => {
    const firstLine = "Hey👋 You're new here.";
    const secondLine = "Let's get you setup!";

    return (
        <>
            <div class="z-10 relative flex flex-col gap-8 h-screen justify-center w-full max-w-lg mx-auto">
                <div>
                    <h2 class="text-[48px] text-balance font-semibold leading-tight text-black/80 tracking-tighter">
                        <For each={Array.from(firstLine.split(" "))}>
                            {(el, index) => (
                                <>
                                    <span class="whitespace-pre inline-block animate-fade-in" style={{"animation-delay": `${(index() +1) * 100}ms`}} aria-hidden="true">{el}</span>
                                    <span class="whitespace-pre inline-block animate-fade-in" style={{"animation-delay": `${(index() +1) * 100}ms`}} aria-hidden="true"> </span>
                                </>
                            )}
                        </For>
                        <br />
                        <For each={Array.from(secondLine.split(" "))}>
                            {(el, index) => (
                                <>
                                    <span class="whitespace-pre inline-block animate-fade-in" style={{"animation-delay": `${(index() + 5) * 100}ms`}} aria-hidden="true">{el}</span>
                                    <span class="whitespace-pre inline-block animate-fade-in" style={{"animation-delay": `${(index() + 5) * 100}ms`}} aria-hidden="true"> </span>
                                </>
                            )}
                        </For>
                    </h2>
                </div>
                <div class="text-2xl leading-tight tracking-tighter fade-in [animation-delay:0.8s]">
                    <p>Let's get your account ready.</p>
                    <p>Enter your name.</p>
                </div>
                <div class="bg-gray-200 rounded-xl leading-relaxed p-4 fade-in [animation-delay:1s]">
                    <p class="text-gray-500">Your name</p>
                    <p>Vish Vadlamani</p>
                </div>
            </div>
            <div
                class="w-screen h-screen flex items-center justify-center animate-spin fixed top-0 left-0 z-0 pointer-events-none"
                style="animation-duration:30s;will-change:transform"
            >
                <div
                    class="w-[100vh] h-[100vh] sm:w-[150vh] sm:h-[150vh] md:w-[150vh] md:h-[150vh] lg:w-screen lg:h-[150vh] absolute bottom-1/4 left-1/2 -translate-x-1/2"
                    style="will-change: background; background: linear-gradient(to top, rgb(247, 247, 247) 32%, rgb(179, 207, 248) 60%, rgb(38, 63, 106) 100%); mask-image: radial-gradient(circle, black 30%, transparent 80%);"
                ></div>
            </div>
        </>
    );
};

export default App;
