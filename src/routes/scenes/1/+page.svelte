<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import saaraVilkuttaa from '$lib/assets/saara-vilkuttaa.jpg';
  import saaraMiettii from '$lib/assets/saara-miettii.jpg';
  import puhekupla from '$lib/assets/bubble.png';
  import { base } from '$app/paths';

  let bubbleStep = 0;
  let bubbleTimer: ReturnType<typeof setTimeout>;

  let screen = 0;
  let step = 0;

  let timer: ReturnType<typeof setTimeout>;

  $: if (screen === 0 && step < 3) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      step += 1;
    }, 2200);
  }

  $: if (screen === 2 && bubbleStep < 2) {
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubbleStep += 1;
    }, 2200);
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
      goto(`${base}/mystery/1`);
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
      <p transition:fade>Ulkona Markus päättää juosta läheiseen puistoon, sillä siellä Väpä usein viihtyy.</p>
    {/if}

    {#if step >= 1}
      <p transition:fade>Lähes heti hän huomaan lähestyvän hahmon...</p>
    {/if}

    {#if step >= 2}
      <p transition:fade>Näyttää siltä että joku on lähtenyt tähän pakkaseen hiihtämään.</p>
      <button class="continue" on:click={next}>Näyttää tutulta...</button>
    {/if}
  </div>
{/if}

{#if screen === 1}
  <div class="screen screen-image">
    <p>
      Hiihtäjä tervehtii Markusta
    </p>
    <img
      src={saaraVilkuttaa}
      alt="vilkutus"
      class="fade-edges"
    />

    <button class="continue" on:click={next}>
      Kysy hiihtäjältä onko hän nähnyt Väpää
    </button>
  </div>
{/if}

{#if screen === 2}
  <div class="screen screen-image">
    <div style="position: relative;">
      <img
        src={saaraMiettii}
        alt="miettii"
        class="fade-edges"
      />

      <div class="speech-bubble" style="background-image: url({puhekupla})" aria-label="Puhekupla">
        {#key bubbleStep}
          <div class="bubble-text">
            {#if bubbleStep === 0}
              <p>Hmm... Taisin tosiaan nähdä jotain!</p>
            {:else if bubbleStep === 1}
              <p>En kyllä muista missä tarkalleen...</p>
            {:else if bubbleStep === 2}
              <p>Mutta onneksi olen suuri dataintoilija! Voit selvittää missä näin Väpän älykelloni datasta.</p>
            {/if}
          </div>
        {/key}
      </div>
    </div>
    
    <button class="continue" on:click={next}>
      Selvitä Väpän sijainti
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
