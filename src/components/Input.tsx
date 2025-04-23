import { createEffect, createSignal, onMount, Setter } from "solid-js";
import { Flow } from "../App";
import { DOMElement } from "solid-js/jsx-runtime";

export default function Input(props: { setFlow: Setter<Flow>; next: Flow }) {
    let ref: HTMLDivElement|undefined;
    const [input, setInput] = createSignal<string>("");
    const handleKeyDown = (
        e: KeyboardEvent & {
          currentTarget: HTMLDivElement;
          target: DOMElement;
        }
      ) => {
        if (e.code === "Enter") {
          e.preventDefault(); // <-- prevent newline insertion
          // TODO: validated email
          props.setFlow(props.next);
          ref?.blur(); // unfocus input
        } else {
          setInput(val => val + e.key); // use `e.key` instead of `e.code` for actual character
        }
      };


    onMount(() => {
        ref?.focus();
    })
    return (
        <div
            ref={ref}
            onkeydown={handleKeyDown}
            oninput={(e) => e.preventDefault()}
            contentEditable={true}
            aria-placeholder="Type here"
            class="text-[64px] outline-none font-bold"
        ></div>
    );
}
