import { useSignal } from "@preact/signals";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Counter from "../islands/Counter.tsx";

import Oneshot from "../islands/Oneshot.tsx";
import { readValidators, Validators } from "~/utils.ts";

interface Data {
  validators: Validators;
}

export const handler: Handlers<Data> = {
  GET(_req, ctx) {
    const validators = readValidators();

    return ctx.render({ validators });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { validators } = data;

  const count = useSignal(3);
  return (
    // <div class="px-4 py-8 mx-auto bg-[#86efac]">
    //   <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
    //     <img
    //       class="my-6"
    //       src="/logo.svg"
    //       width="128"
    //       height="128"
    //       alt="the Fresh logo: a sliced lemon dripping with juice"
    //     />
    //     <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
    //     <p class="my-4">
    //       Try updating this message in the
    //       <code class="mx-2">./routes/index.tsx</code> file, and refresh.
    //     </p>
    //     <Counter count={count} />
    //   </div>
    // </div>
    <>
      <Head>
        <title>One Shot</title>
      </Head>

      <div class="max-w-2xl mx-auto mt-20 mb-10">
        <div class="mb-10">
          <h2 class="text-lg font-semibold text-gray-900">
            Make a one shot minting and lock contract
          </h2>

          <h3 class="mt-4 mb-2">Redeem</h3>
          <pre class="bg-gray-200 p-2 rounded overflow-x-scroll">
          {validators.redeem.script}
          </pre>

          <h3 class="mt-4 mb-2">Gift Card</h3>
          <pre class="bg-gray-200 p-2 rounded overflow-x-scroll">
          {validators.giftCard.script}
          </pre>
        </div>

        <Oneshot validators={validators} />
      </div>
    </>
  );
}
