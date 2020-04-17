<script>
  import { siteData } from '../routes/_layout.svelte'
  export let title
  export let description
</script>

<svelte:head>
  <title>{siteData.metaData.name} | {title}</title>
  <meta name="description" content={description} />
</svelte:head>
