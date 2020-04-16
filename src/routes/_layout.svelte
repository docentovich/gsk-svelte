<script context="module">
  export async function preload() {
    const { name } = await (
      await this.fetch(process.env.SAPPER_APP_API_URL)
    ).json()
    return {
      metaData: name,
    }
  }
</script>

<script>
  import Widget from '../components/Widget.svelte'
  import PostLinksAccordion from '../components/PostLinksAccordion.svelte'
  import News from '../components/News.svelte'
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import { metaDataStore } from '../store.js'

  export let segment
  export let metaData
  metaDataStore.set(metaData)
</script>

<style lang="scss">
  .content {
    display: flex;
  }

  aside {
    width: 300px;

    display: block;
    flex-shrink: 0;
  }

  main {
    flex-grow: 1;
    flex-basis: 0;
  }
</style>

<Header {segment} />

<div class="content container">
  <aside>
    <Widget>
      <h3>Меню сайта</h3>
      <PostLinksAccordion />
    </Widget>
    <Widget>
      <h3>Новости</h3>
      <News />
    </Widget>
  </aside>
  <main>
    <slot />
  </main>
</div>

<Footer />
