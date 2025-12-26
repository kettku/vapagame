<script lang="ts">
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
</script>

<h1>Väpän joulumysteeri</h1>
<button on:click={goto(`${base}/intro`)}>Aloita peli!</button>
