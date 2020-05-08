<script context="module">
  import { apiUrlV2 } from '../../helpers/constants'

  export async function preload(page, session) {
    const { type, slug } = page.params
    const content = await (
      await this.fetch(`${apiUrlV2}/custom_routes/${type}/${slug}`)
    ).json()

    return { content }
  }
</script>

<script>
  import MainInnerPage from '../../components/MainInnerPage.svelte'
  import MetaData from '../../components/MetaData.svelte'

  export let content
</script>

<MetaData
  title={content.yoast_title}
  description={content.yoast_meta[0].content} />

<MainInnerPage>
  {@html content.content.rendered}
</MainInnerPage>
