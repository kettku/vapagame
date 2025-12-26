<p style="font-style: italic;">
Otto on asetellut lelujaan järjestykseen.
</p>


<div class="code">
    1. Lelu: NUKKE<br>
    <br>
    2. Lelu: HANSKA<br>
    <br>
    3. Lelu: KEKSI<br>
    <br>
    4. Lelu: VINKU<br>
    <br>
    5. Lelu: KEPPI
</div>

<div class="answer">
	<p>Eli mitä?</p>
	<input name="nInput" bind:value={input} on:input={(ev) => {input = sanitize(ev.target.value); attempted = false }} />
	
	<div>
		<button class="next-button continue" on:click={handleClick}>Jatka</button>
	</div>	

	{#if showNope}
		<p class="nope">No ei?</p>
	{/if}
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

	let input = '';
	const correct = 'NAKKI';

	$: isCorrect = input === correct;
	let attempted = false;
	$: showNope = attempted && !isCorrect;

  function sanitize(value: string) {
    return value.replace(/[^A-Za-z]/g, '').slice(0, correct.length).toUpperCase();
  }

	function handleClick() {
		attempted = true;
		if (isCorrect) goto(resolve(`/final`));
	}
</script>

<style>
  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0.75rem 0;
  }

  .continue {
    margin-top: 1rem;
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

  .code {
    text-align: left;
    border: 1px solid #ffffff30;
    border-radius: 6px;
    background-color: #323232;
    color: #b9b9b9;
    padding: 10px;
  }

  .answer {
	margin: 2rem;
  }

	.nope {
		color: #ff6b6b;
		margin-top: 1rem;
		font-weight: 700;
	}
</style>