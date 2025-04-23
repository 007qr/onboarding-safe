import { Component, createSignal, Show } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import Button from "./components/Button";
import Input from "./components/Input";

export type Flow = "email" | "name" | "phone" | "otp" | "done";

const App: Component = () => {
    const [flow, setFlow] = createSignal<Flow>("email");

    return (
        <>
            <div class="flex items-center justify-center h-screen w-screen">
                <Presence>
                    <Show when={flow() == "email"}>
                        <Motion.div 
                            class="flex flex-col items-center font-medium gap-[30px] absolute"
                            initial={{ opacity: 0, y: 100, transition: { easing: 'ease-in', duration: 0.6 } }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.01, y: -100, transition: { duration: 0.7, easing: [0.215, 0.61, 0.355, 1] } }}
                            >
                            <h4 class="text-3xl font-bold">
                                Get started with your email
                            </h4>

                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="name" />
                            <Button onClick={() => setFlow("name")}>Get Started</Button>

                            <p></p>
                        </Motion.div>
                    </Show>
                    <Show when={flow() == "name"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.2,easing: [0.215, 0.61, 0.355, 1], duration: 0.5 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 0.7, easing: [0.215, 0.61, 0.355, 1] } }}
                        >
                            <h4 class="text-3xl font-bold">Your Full Name</h4>
                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="phone" />
                            <Button>Next</Button>
                        </Motion.div>
                    </Show>

                    <Show when={flow() == "phone"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.2,easing: [0.215, 0.61, 0.355, 1], duration: 0.5 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 0.7, easing: [0.215, 0.61, 0.355, 1] } }}
                        >
                            <h4 class="text-3xl font-bold">Phone Number</h4>
                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="otp" />
                            <Button>Next</Button>
                        </Motion.div>
                    </Show>

                    <Show when={flow() == "otp"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.2,easing: [0.215, 0.61, 0.355, 1], duration: 0.5 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 0.7, easing: [0.215, 0.61, 0.355, 1] } }}
                        >
                            <h4 class="text-3xl font-bold">OTP</h4>
                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="done" />
                            <Button>Next</Button>
                        </Motion.div>
                    </Show>

                    <Show when={flow() == "done"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.2,easing: [0.215, 0.61, 0.355, 1], duration: 0.5 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 0.7, easing: [0.215, 0.61, 0.355, 1] } }}
                        >
                            <h4 class="text-3xl font-bold">Congratulations 🎊</h4>
                            <Button>Next</Button>
                        </Motion.div>
                    </Show>
                    
                </Presence>
            </div>
        </>
    );
};

export default App;
