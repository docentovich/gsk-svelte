<script context="module">
  import { apiUrlV2 } from '../helpers/constants'

  export async function preload() {
    const data = await (await this.fetch(`${apiUrlV2}/frontpage`)).json()

    return { page: data }
  }
</script>

<script>
  import PostLinksMain from '../components/PostLinksMain.svelte'
  import { metaDataStore } from '../store'
  export let page
</script>

<svelte:head>
  <title>{$metaDataStore} | Проектная организация</title>
  <meta name="description" content={page.meta._yoast_wpseo_metadesc} />
</svelte:head>

<article class="content">
  <header>
    <h1>Проектная организация ГСК-СТРОЙ:</h1>
  </header>
  <p>
    Наша проектная организация имеет большой опыт в сфере проектирования и
    согласования как нового строительства, так и реконструкции существующих
    зданий.
  </p>

  <article>
    <header>
      <h2>О преимуществах организации ГСК-СТРОЙ</h2>
    </header>
    <ul>
      <li>
        Вы экономите время, поскольку проект и согласование мы делаем в сжатые
        сроки!
      </li>
      <li>
        Вы не переплатите за лишние разделы проектной документации и
        согласования, поскольку к результату мы идем кратчайшим путем!
      </li>
      <li>
        Вы можете быть уверены в положительном результате, потому что по все
        объектам мы проводим предварительный анализ и необходимые консультации в
        комитетах!
      </li>
    </ul>
  </article>

  <article>
    <PostLinksMain />
  </article>

  <article>
    <header>
      <h2>{page.title.rendered}</h2>
    </header>
    <div>
      {@html page.content.rendered}
    </div>
  </article>

</article>
