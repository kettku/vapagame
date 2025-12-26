<p style="font-style: italic;">
"Olin juuri saavuttanut harjanteen huipun, kun huomasin liikettä kauempana. Silloin huomasin kauempana koiran, ja
luonnollisesti innostuin! Rakastan koiria! Se oli varmaan Väpä. Yritin rientää sen perään, mutta se oli nopeampi.
Kun myöhemmin katsoin kelloani, huomasin että sijaintitiedot olivat toimineet vain lenkin alussa. En ole varma kuinka
kauan lenkkiä oli silloin mennyt. Muutama kilsa?"
</p>

<p>Älykellon data:</p>
<table border="1" cellpadding="6" style="border-collapse:collapse; margin-top:16px; margin: 10px auto;">
	<thead>
			<tr>
					<th scope="col">Aika</th>
					<th scope="col">Korkeus (m)</th>
					<th scope="col">Syke (BPM)</th>
					<th scope="col">Suunta</th>
					<th scope="col">Kuljettu matka</th>
					<th scope="col">Sijainti-N</th>
					<th scope="col">Sijainti-E</th>
			</tr>
	</thead>
	<tbody>
			<tr>
							<td>7:43</td>
							<td>120</td>
							<td>143</td>
							<td>350°</td>
							<td>1000</td>
							<td>6180</td>
							<td>2320</td>
			</tr>
		<tr>
			<td>7:44</td>
			<td>120</td>
			<td>145</td>
			<td>350°</td>
			<td>1200</td>
			<td>6210</td>
			<td>2440</td>
		</tr>
		<tr>
			<td>7:45</td>
			<td>135</td>
			<td>155</td>
			<td>355°</td>
			<td>1350</td>
			<td>6250</td>
			<td>2445</td>
		</tr>
		<tr>
			<td>7:46</td>
			<td>156</td>
			<td>167</td>
			<td>0°</td>
			<td>1410</td>
			<td>6250</td>
			<td>2445</td>
		</tr>
		<tr>
			<td>7:47</td>
			<td>156</td>
			<td>172</td>
			<td>0°</td>
			<td>1482</td>
			<td>6250</td>
			<td>2445</td>
		</tr>
		<tr>
			<td>7:48</td>
			<td>156</td>
			<td>165</td>
			<td>45°</td>
			<td>1550</td>
			<td>6250</td>
			<td>2445</td>
		</tr>
		<tr>
			<td>7:49</td>
			<td>152</td>
			<td>160</td>
			<td>45°</td>
			<td>1600</td>
			<td>6250</td>
			<td>2445</td>
		</tr>
	</tbody>
</table>

<div class="answer">
	<p>Missä Väpä oli? Sijainti:</p>
	N: <input name="nInput" bind:value={nInput} on:input={(ev) => { nInput = sanitize(ev.target.value); attempted = false }} maxlength="4" inputmode="numeric" />
	E: <input name="eInput" bind:value={eInput} on:input={(ev) => { eInput = sanitize(ev.target.value); attempted = false }} maxlength="4" inputmode="numeric" />
	
	<div>
		<button class="next-button continue" on:click={handleClick}>Jatka</button>
	</div>
	

	{#if showNope}
		<p class="nope">Väpä ei ollut siellä!</p>
	{/if}
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let nInput = '';
	let eInput = '';
	const correctN = '6382';
	const correctE = '2445';


	$: isCorrect = nInput === correctN && eInput === correctE;
	let attempted = false;
	$: showNope = attempted && !isCorrect;

	function sanitize(value: string) {
		return value.replace(/\D/g, '').slice(0, 4);
	}

	function handleClick() {
		attempted = true;
		if (isCorrect) goto(`${base}/scenes/2`);
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

  .answer {
	margin: 2rem;
  }

	.nope {
		color: #ff6b6b;
		margin-top: 1rem;
		font-weight: 700;
	}
</style>