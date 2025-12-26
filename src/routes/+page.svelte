<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
</script>

<h1>Väpän joulumysteeri</h1>
<button on:click={() => goto(resolve('/intro'))}>Aloita peli!</button>
