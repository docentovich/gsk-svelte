<script context="module">
  export async function preload() {
    const data = await (
      await this.fetch(`/api/wp/v2/custom_routes/sitemap`)
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

<style>
  ul {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    margin: 0;
    padding: 0;
    background: transparent;
  }

  ul li a {
    color: #337ab7;
    font-size: 12px;
    text-decoration: none;
  }
</style>

<MetaData title="Карта сайта" description="Карта сайта" />

<main itemscope itemprop="mainContentOfPage">
  <Article>
    <h1 slot="header">Карта сайта</h1>

    <div class="wrapper">
      <ul>
        {#each sitemap as link}
          <li>
            <a rel="prefetch" href={contentTypeToFrontUrl(link)} itemprop="url">
              {link.post_title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </Article>
</main>
