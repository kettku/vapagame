<script lang="ts">
  let { children } = $props();
</script>

<div class="game-root">
	<section class="content">
		{@render children()}
	</section>
</div>

<style>
  .game-root {
				min-height: 100vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background: #0e0e0e;
				color: #eee;
				padding: 2rem;
				text-align: center;
				font-family: Arial, Helvetica, sans-serif;
		}

 .content {
	width: 50%;
 }
</style>