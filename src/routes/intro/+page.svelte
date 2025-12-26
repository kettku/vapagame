<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';

  let screen = 0;
  let step = 0;

  let timer: ReturnType<typeof setTimeout>;

  $: if (screen === 0 && step < 3) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      step += 1;
    }, 1200);
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
      goto('/scenes/1');
    }
  }

  onDestroy(() => {
    clearTimeout(timer);
  });
</script>

{#if screen === 0}
  <div class="screen screen-text">
    {#if step >= 0}
      <p transition:fade>On jouluaatto aamu 24.12.</p>
    {/if}

    {#if step >= 1}
      <p transition:fade>Markus herää lumiseen aamuun.</p>
    {/if}

    {#if step >= 2}
      <p transition:fade>Hän kävelee alakertaan</p>
    {/if}

    {#if step >= 3}
      <p transition:fade>... mutta jotain on vialla</p>
      <button class="continue" on:click={next}>Jatka</button>
    {/if}
  </div>
{/if}

{#if screen === 1}
  <div class="screen screen-image">
    <img
      src="/images/key_in_snow.webp"
      alt="Avaimenperä lumessa"
    />

    <p>
      Väpä oli kadonnut!
    </p>
    <button class="continue" on:click={next}>
      Mitä??
    </button>
  </div>
{/if}

{#if screen === 2}
  <div class="screen screen-final" transition:fade>
    <p>
      Ympärille katsoessaan Markus huomaa oven olevan auki. Hän juoksee ulos!
    </p>

    <button class="continue" on:click={next}>
      Eteenpäin
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
    margin: 1.5rem 0;
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
</style>
