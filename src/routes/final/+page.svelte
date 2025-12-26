<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import vapa from '$lib/assets/vapa.jpg';

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
  }

  onDestroy(() => {
    clearTimeout(timer);
  });
</script>

{#if screen === 0}
  <div class="screen screen-text">
    {#if step >= 0}
      <p transition:fade>"Leluista näyttäisi muodustavan sana nakki", Markus toteaa.</p>
    {/if}

    {#if step >= 1}
      <p transition:fade>Samassa Otto pinkaisee juoksuun. Yllättyneenä Markus säntää koiran perään.</p>
    {/if}

    {#if step >= 2}
      <p transition:fade>He saapuvat läheisen puiston grillikodalle, josta savu kohoaa.</p>
      <button class="continue" on:click={next}>Astu kotaan</button>
    {/if}
  </div>
{/if}

{#if screen === 1}
  <div class="screen screen-image">
    <p>
      LÖYSIT VÄPÄN GRILLAAMASTA NAKKEJA!
    </p>
    <img
      src={vapa}
      alt="vapa"
      class="fade-edges"
    />

    <button class="continue" on:click={next}>
      NO AHA
    </button>
  </div>
{/if}

{#if screen === 2}
  <div class="screen screen-image">
    LÄPÄISIT PELIN!
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
</style>
