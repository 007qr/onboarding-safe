import { Component, createEffect, For } from "solid-js";

const App: Component = () => {
    const firstLine = "Hey👋 You're new here.";
    const secondLine = "Let's get you setup!";

    // create Effect for Bg blur Animation
    createEffect(() => {
        let hue = 30;
        let direction = -1;
        function animate() {
            hue += direction * 1;
            if (hue <= 0 || hue >= 359) direction *= -1;

            let div = document.getElementById("blur-bg-effect-animation") as HTMLDivElement;
    
            div.style.background = `linear-gradient(
                to top,
                rgb(247, 247, 247) 32%,
                hsl(${hue}, 100%, 70%) 60%,
                hsl(${Math.max(hue - 100, 0)}, 90%, 40%) 100%
              )`;
          

            setTimeout(() => requestAnimationFrame(animate), 50);
        }

        animate();

    }, []);

    return (
        <>
            <div class="z-10 relative flex flex-col gap-8 h-screen justify-center w-full max-w-lg mx-auto">
                <div>
                    <h2 class="text-[48px] text-balance font-semibold leading-tight text-black/80 tracking-tighter">
                        <span class="sr-only">Hey👋 You're new here. Let's get you setup!</span>
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
                <div class="fade-in [animation-delay:1s] rounded-[22px] drop-shadow-lg font-inter">
                    <div class="leading-relaxed p-3 border-2 border-b-0 rounded-t-[22px] border-gray-300">
                        <label class="text-gray-600 block text-sm font-inter">Your name</label>
                        <input type="text" class="outline-none focus:outline-none font-inter" value="Vish Vadlamani" placeholder=""/>
                    </div>
                    <div class="leading-relaxed p-3 border-2 rounded-b-[22px] border-gray-300">
                        <label class="text-gray-600 block text-sm font-inter">Mobile number</label>
                        <input type="tel" class="outline-none focus:outline-none font-inter" value="+1 555 555 5556" placeholder=""/>
                    </div>
                </div>
            </div>
            <div
                class="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-0 pointer-events-none"
            >
                <div
                    class="animate-bg w-[100vh] h-[100vh] sm:w-[150vh] sm:h-[150vh] md:w-[150vh] md:h-[150vh] lg:w-screen lg:h-[150vh] absolute bottom-1/4 left-1/2 -translate-x-1/2"
                    style="will-change: background; mask-image: radial-gradient(circle, black 30%, transparent 80%);"
                    id="blur-bg-effect-animation"
                ></div>
            </div>
        </>
    );
};

export default App;
