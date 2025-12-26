<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import heijastin from '$lib/assets/heijastin.jpg';
  import puhekupla from '$lib/assets/bubble.png';
  import teemu from '$lib/assets/teemu.jpg';
  import { base } from '$app/paths';
  import { resolve } from '$app/paths';

  let bubbleStep = 0;
  let bubbleTimer: ReturnType<typeof setTimeout>;

  let screen = 0;
  let step = 0;

  let timer: ReturnType<typeof setTimeout>;

  $: if ((screen === 0 || screen === 2) && step < 3) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      step += 1;
    }, 2200);
  }

  $: if (screen === 3 && bubbleStep < 2) {
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubbleStep += 1;
    }, 2500);
  }

  function next() {
    if (screen === 0) {
      screen = 1;
      step = 0;
      return;
    }

    if (screen === 1) {
      screen = 2;
      step = 0;
      return;
    }

    if (screen === 2) {
      screen = 3;
      step = 0;
      return;
    }

    if (screen === 3) {
      goto(resolve(`/mystery/2`));
    }
  }

  onDestroy(() => {
    clearTimeout(timer);
    clearTimeout(bubbleTimer);
  });
</script>

{#if screen === 0}
  <div class="screen screen-text">
    {#if step >= 0}
      <p transition:fade>Väpän sijainti löytyi!</p>
    {/if}

    {#if step >= 1}
      <p transition:fade>Pienen juoksumatkan jälkeen Markus saavuttaa oikean paikan.</p>
    {/if}

    {#if step >= 2}
      <p transition:fade>Aluksi paikka näyttää tyhjältä....</p>
      <button class="continue" on:click={next}>Katso ympärillesi</button>
    {/if}
  </div>
{/if}

{#if screen === 1}
  <div class="screen screen-image">
    <p>
      Lumessa vilkkuu jotain punaista! Se on Väpän heijastin!
    </p>
    <img
      src={heijastin}
      alt="heijastin"
      class="fade-edges"
    />

    <button class="continue" on:click={next}>
      Ahaa!
    </button>
  </div>
{/if}

{#if screen === 2}
  <div class="screen screen-text">
    {#if step >= 0}
      <p transition:fade>Markus nostaa heijastimen käteensä. Se näyttää vilkkuvan jotenkin omituisesti.</p>
    {/if}

    {#if step >= 1}
      <p transition:fade>"Voisikohan tästä saada tietoja jotenkin?" hän miettii.</p>
    {/if}

    {#if step >= 2}
      <p transition:fade>Onneksi hän tuntee hyvän hakkeroijan.</p>
      <button class="continue" on:click={next}>Mene kysymään hakkerilta apua</button>
    {/if}
  </div>
{/if}

{#if screen === 3}
  <div class="screen screen-image">
    <div style="position: relative;">
      <img
        src={teemu}
        alt="hakkeri"
        class="fade-edges"
      />

      <div class="speech-bubble" style="background-image: url({puhekupla})" aria-label="Puhekupla">
        {#key bubbleStep}
          <div class="bubble-text">
            {#if bubbleStep === 0}
              <p>Hmm... joudun kyllä kohta lähtemään ammuntatreeneihin</p>
            {:else if bubbleStep === 1}
              <p>Mutta ehkä ehdin nopeasti selvittää tämän</p>
            {:else if bubbleStep === 2}
              <p>Heijastin on varmaan aika helppo hakkeroida</p>
            {/if}
          </div>
        {/key}
      </div>
    </div>
    
    <button class="continue" on:click={next}>
      Mitä heijastimesta selvisi?
    </button>
  </div>
{/if}

<style>
  .screen {
    display: flex;
    flex-direction: column;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0.75rem 0;
  }

  img {
    width: 100%;
    max-width: 420px;
    border-radius: 12px;
    margin: 0.5rem 0;
  }

  .continue {
    margin-top: 2rem;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    background: #ffffff10;
    color: #fff;
    border: 1px solid #ffffff30;
    border-radius: 6px;
    cursor: pointer;
  }

  .continue:hover {
    background: #ffffff20;
  }

  .fade-edges {
    width: 320px;
    margin: 0 auto;

    -webkit-mask-image: radial-gradient(
      ellipse at center,
      black 35%,
      transparent 71%
    );

    mask-image: radial-gradient(
      ellipse at center,
      black 35%,
      transparent 71%
    );
  }

  .speech-bubble {
    position: absolute;
    top: -120px;
    right: -150px;
    width: 100%;
    max-width: 560px;
    min-height: 260px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center top;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 2.25rem;
    box-sizing: border-box;
  }

  .speech-bubble .bubble-text {
    width: 100%;
    max-width: 50%;
    margin-top: -30px;
  }

  .speech-bubble .bubble-text p {
    margin: 0;
    color: #000;
    font-size: 1.125rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
</style>
