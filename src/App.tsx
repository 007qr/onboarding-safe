import { Component, createSignal, Show } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import Button from "./components/Button";
import Input from "./components/Input";
import OTPInput from "./components/OTPInput";

export type Flow = "email" | "name" | "phone" | "otp" | "done";

const App: Component = () => {
    const [flow, setFlow] = createSignal<Flow>("otp");

    return (
        <>
            <div class="flex items-center justify-center h-screen w-screen">
                <Presence>
                    <Show when={flow() == "email"}>
                        <Motion.div 
                            class="flex flex-col items-center font-medium gap-[30px] absolute w-[364px]"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.38, easing: [0.19, 1, 0.22, 1], duration: 1.2 } }}
                            exit={{ opacity: 0, scale: 1.01, y: -100, transition: { duration: 1.25, easing: [0.16, 1, 0.29, 0.99] } }}
                            >
                            <h4 class="text-2xl font-bold">
                                Get started with your email
                            </h4>

                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="name" />
                            <div class="flex gap-6">
                                <Button onClick={() => setFlow("name")}>Get Started</Button>
                                <div class="font-normal flex items-center gap-1 text-sm">
                                    <img src="/arrow-subdirectory.svg" class="bg-gray-200 rounded-lg p-1"/>
                                    <p>Or Press <span class="font-semibold">Enter</span></p>
                                </div>
                            </div>
                        </Motion.div>
                    </Show>
                    <Show when={flow() == "name"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute w-[364px]"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.38, easing: [0.19, 1, 0.22, 1], duration: 1.2 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 1.25, easing: [0.16, 1, 0.29, 0.99] } }}
                        >
                            <span onclick={() => setFlow("email")} class="cursor-pointer self-start w-[20vw] flex gap-1 text-sm font-bold">
                                <img src="/arrow-back.svg" alt="" />
                                <p>Back</p>
                            </span>
                            <h4 class="text-3xl font-bold">Your Full Name</h4>
                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="phone" />
                            <div class="flex gap-6">
                                <Button onClick={() => setFlow("phone")}>Next</Button>
                                <div class="font-normal flex items-center gap-1 text-sm">
                                    <img src="/arrow-subdirectory.svg" class="bg-gray-200 rounded-lg p-1"/>
                                    <p>Or Press <span class="font-semibold">Enter</span></p>
                                </div>
                            </div>
                        </Motion.div>
                    </Show>

                    <Show when={flow() == "phone"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute w-[364px]"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.38,easing: [0.19, 1, 0.22, 1], duration: 1.2 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 1.25, easing: [0.16, 1, 0.29, 0.99] } }}
                        >
                            <span onclick={() => setFlow("name")} class="cursor-pointer self-start w-[20vw] flex gap-1 text-sm font-bold">
                                <img src="/arrow-back.svg" alt="" />
                                <p>Back</p>
                            </span>
                            <h4 class="text-3xl font-bold">Phone Number</h4>
                            {/* TODO: Style the input */}
                            <Input setFlow={setFlow} next="otp" />
                            <div class="flex gap-6">
                                <Button onClick={() => setFlow("otp")}>Next</Button>
                                <div class="font-normal flex items-center gap-1 text-sm">
                                    <img src="/arrow-subdirectory.svg" class="bg-gray-200 rounded-lg p-1"/>
                                    <p>Or Press <span class="font-semibold">Enter</span></p>
                                </div>
                            </div>
                        </Motion.div>
                    </Show>

                    <Show when={flow() == "otp"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute w-[364px]"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.38,easing: [0.19, 1, 0.22, 1], duration: 1.2 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 1.25, easing: [0.16, 1, 0.29, 0.99] } }}
                        >
                            <span onclick={() => setFlow("phone")} class="cursor-pointer self-start w-[20vw] flex gap-1 text-sm font-bold">
                                <img src="/arrow-back.svg" alt="" />
                                <p>Back</p>
                            </span>
                            <h4 class="text-3xl font-bold">OTP</h4>
                            {/* TODO: Style the input */}
                            <OTPInput setFlow={setFlow} next="done" />
                            <div class="flex gap-6">
                                <Button onClick={() => setFlow("done")}>Next</Button>
                                <div class="font-normal flex items-center gap-1 text-sm">
                                    <img src="/arrow-subdirectory.svg" class="bg-gray-200 rounded-lg p-1"/>
                                    <p>Or Press <span class="font-semibold">Enter</span></p>
                                </div>
                            </div>
                        </Motion.div>
                    </Show>

                    <Show when={flow() == "done"}>
                        <Motion.div
                            class="flex flex-col items-center font-medium gap-[30px] absolute w-[364px]"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.38, easing: [0.19, 1, 0.22, 1], duration: 1.2 } }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 1.25, easing: [0.16, 1, 0.29, 0.99] } }}
                        >
                            <h4 class="text-3xl font-bold">Congratulations 🎊</h4>
                            <Button onClick={() => setFlow("email")}>Next</Button>
                        </Motion.div>
                    </Show>
                    
                </Presence>
            </div>
        </>
    );
};

export default App;
