<p style="font-style: italic;">
"Heijastin on synkannyt erilaisia reitittimiä, kun Väpä on ohittanut niitä. Nimet ovat kuitenkin
tallentuneet kryptattuna."
</p>


<div class="code">
    [06:10:05] ADDR:00:A1:CC:11 | SYNC_OK | CODE:100-01 <br>
    [06:12:40] ADDR:44:DE:FB:01 | SIGNAL_DETECT | CODE:11-15-20-09 <br>
    [06:13:02] ADDR:44:DE:FB:01 | SIGNAL_LOST | CODE:11-15-20-09 <br>
    [06:15:10] ADDR:00:A1:CC:22 | SYNC_OK | CODE:100-02 <br>
    [06:18:20] ADDR:22:BC:AA:05 | SIGNAL_DETECT | CODE:13-09-11-01 <br>
    [06:20:15] ADDR:14:B2:A1:99 | SIGNAL_DETECT | CODE:15-20-20-15 <br>
    [06:22:45] ADDR:77:BC:FF:10 | SIGNAL_DETECT | CODE:18-05-09 <br>
    [06:27:10] ADDR:88:AA:CC:02 | SIGNAL_DETECT | CODE:01-21-20-15 <br>
    [06:30:45] ADDR:14:B2:A1:99 | SIGNAL_UPDATE | CODE:15-20-20-15 <br>
    [06:33:12] ADDR:00:A1:CC:22 | KEEPALIVE_BEACON <br>
    [06:36:55] ADDR:14:B2:A1:99 | SIGNAL_STRENGTH_HIGH | CODE:15-20-20-15 <br>
    [06:39:20] ADDR:14:B2:A1:99 | SIGNAL_LOST <br>
    [06:42:00] ADDR:00:A1:CC:33 | SYNC_OK | CODE:100-03 <br>
    [06:45:10] ADDR:D9:F8:E7:C5 | SIGNAL_DETECT | CODE:D8-D7-D6-D5 <br>
</div>

<div class="answer">
	<p>Syötä verkon nimi:</p>
	<input name="nInput" bind:value={input} on:input={(ev) => {input = sanitize(ev.target.value); attempted = false }} />
	
	<div>
		<button class="next-button continue" on:click={handleClick}>Jatka</button>
	</div>	

	{#if showNope}
		<p class="nope">Väärä verkon nimi.</p>
	{/if}
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

	let input = '';
	const correct = 'OTTO';

	$: isCorrect = input === correct;
	let attempted = false;
	$: showNope = attempted && !isCorrect;

  function sanitize(value: string) {
    return value.replace(/[^A-Za-z]/g, '').slice(0, correct.length).toUpperCase();
  }

	function handleClick() {
		attempted = true;
		if (isCorrect) goto(resolve(`/scenes/3`));
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