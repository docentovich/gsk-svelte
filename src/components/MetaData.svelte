<script>
  import { globalData } from '../store'

  export let title
  export let description
</script>

<svelte:head>
  <title>{$globalData.name} | {title}</title>
  <meta name="description" content={description} />
</svelte:head>
