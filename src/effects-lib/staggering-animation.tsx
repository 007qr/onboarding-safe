import { Accessor, For, type Component } from "solid-js";

const h2Text = ["Hey", "👋", "You're", "new", "here.", "Let's", "get", "you", "setup!"];
const App: Component = () => {
    return (
        <div class="flex flex-col gap-8 h-screen justify-center w-full max-w-lg mx-auto">
            <div>
                <h2 class="flex flex-wrap gap-2 text-4xl font-bold leading-tight text-black/80 tracking-tighter">
                    <For each={h2Text}>
                        {(item: string, index: Accessor<number>) => (
                            <span
                                class="staggered-animation"
                                style={{
                                    "animation-delay": `${
                                        (index() + 1) * 200
                                    }ms`,
                                }}
                            >
                                {item}
                            </span>
                        )}
                    </For>
                </h2>
            </div>
            <div class="text-2xl leading-tight tracking-tighter staggered-animation" style={{"animation-delay": "500ms"}}>
                <p>Let's get your account ready.</p>
                <p>Enter your name.</p>
            </div>
            <div class="bg-gray-200 rounded-xl leading-relaxed p-4 staggered-animation" style={{"animation-delay": "550ms"}}>
                <p class="text-gray-500">Your name</p>
                <p>Vish Vadlamani</p>
            </div>
        </div>
    );
};

export default App;
