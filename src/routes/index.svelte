<script context="module">
  import { apiUrlV2 } from '../helpers/constants'

  export async function preload() {
    const data = await (await this.fetch(`${apiUrlV2}/frontpage`)).json()

    return { page: data }
  }
</script>

<script>
  export let page
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>
<div class="content">
  {@html page.content.rendered}
</div>
