<script context="module">
  import { apiUrlV2 } from '../helpers/constants'

  export async function preload() {
    const data = await (
      await this.fetch(`${apiUrlV2}/custom_routes/sitemap`)
    ).json()

    return { sitemap: data }
  }
</script>

<script>
  import MetaData from '../components/MetaData.svelte'
  import Article from '../components/Article.svelte'
  import { contentTypeToFrontUrl } from '../helpers/types_urls'

  export let sitemap
</script>

<MetaData title="Карта сайта" description="Карта сайта" />

<main itemscope itemprop="mainContentOfPage">
  <Article>
    <h1 slot="header">Карта сайта</h1>

    <div class="wrapper">
      <ul>
        {#each sitemap as link}
          <li>
            <a rel="prefetch" href={contentTypeToFrontUrl(link)} itemprop="url">
              {link.slug}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </Article>
</main>
