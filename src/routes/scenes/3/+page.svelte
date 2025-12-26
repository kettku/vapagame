<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import otto from '$lib/assets/otto.jpg';
  import puhekupla from '$lib/assets/bubble.png';

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
      goto('/mystery/3');
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
      <p transition:fade>Otto! No olisihan se pitänyt arvata. </p>
    {/if}

    {#if step >= 1}
      <p transition:fade>Lokien mukaan Väpä on viettänyt Oton luona jonkun aikaa.</p>
    {/if}

    {#if step >= 2}
      <p transition:fade>Paras lähteä Oton luo etsimään vihjettä.</p>
      <button class="continue" on:click={next}>Menoksi</button>
    {/if}
  </div>
{/if}

{#if screen === 1}
  <div class="screen screen-image">
    <div style="position: relative;">
      <img
        src={otto}
        alt="haukkuu"
        class="fade-edges"
      />

      <div class="speech-bubble" style="background-image: url({puhekupla})" aria-label="Puhekupla">
        <div class="bubble-text">
          <p>VUH!</p>
          </div>
      </div>
    </div>

    <button class="continue" on:click={next}>
      Selvitä mitä Otto tietää Väpästä
    </button>
  </div>
{/if}

<style>
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
