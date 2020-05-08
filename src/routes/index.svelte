<script context="module">
  import { apiUrlV2 } from '../helpers/constants'

  export async function preload() {
    const data = await (await this.fetch(`${apiUrlV2}/frontpage`)).json()

    return { page: data }
  }
</script>

<script>
  import CategoriesMenuMain from '../components/CategoriesMenuMain.svelte'
  import MetaData from '../components/MetaData.svelte'
  import { globalData } from '../store'
  import Article from '../components/Article.svelte'

  export let page
</script>

<style lang="scss">
  @import 'varibales';
  h1,
  h2 {
    width: auto;
    display: inline-block;

    font-family: Gabriolaa, serif;
    color: #552d26;
    font-size: 34px;
    border-bottom: 2px solid #887471;
    margin-bottom: 15px;
  }

  .wrapper {
    margin: 45px 0;
  }

  ul.advantages {
    padding: 0;
  }

  ul.advantages li {
    position: relative;
    list-style: none;
    font-size: 16px;
    margin-bottom: 15px;
    padding-left: 40px;
    text-align: left;
    color: $brown-font-color;

    &:before {
      left: 0;
      top: 50%;
      width: 25px;
      height: 26px;
      transform: translateY(-50%);

      position: absolute;
      content: ' ';
      background: url('/check.png');
    }
  }

  .content {
    color: #552d26;
  }
</style>

<MetaData title={page.yoast_title} description={page.yoast_meta[0].content} />

<main itemscope itemprop="mainContentOfPage">
  <Article>
    <h1 slot="header">Проектная организация ГСК-СТРОЙ:</h1>
    <p slot="description">
      Наша проектная организация имеет большой опыт в сфере проектирования и
      согласования как нового строительства, так и реконструкции существующих
      зданий.
    </p>

    <div class="wrapper">
      <Article>
        <h2 slot="header">О преимуществах организации ГСК-СТРОЙ</h2>
        <ul class="advantages">
          <li>
            Вы экономите время, поскольку проект и согласование мы делаем в
            сжатые сроки!
          </li>
          <li>
            Вы не переплатите за лишние разделы проектной документации и
            согласования, поскольку к результату мы идем кратчайшим путем!
          </li>
          <li>
            Вы можете быть уверены в положительном результате, потому что по все
            объектам мы проводим предварительный анализ и необходимые
            консультации в комитетах!
          </li>
        </ul>
      </Article>
    </div>

    <div class="wrapper">
      <article>
        <CategoriesMenuMain categoriesMenu={$globalData.categoriesMenu.items} />
      </article>
    </div>

    <div class="wrapper">
      <Article>
        <h2 slot="header">{page.title.rendered}</h2>
        <div class="content">
          {@html page.content.rendered}
        </div>
      </Article>
    </div>
  </Article>
</main>
