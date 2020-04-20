<script context="module">
  export const aaa = { data: 'start' }
  /** data mocks */
  function genLi(name, link = null) {
    link = link || name
    return { name, link }
  }
  const _navList = {
    json: () => [
      genLi('Проекты по разделам и назначению', '/'),
      genLi('Проекты капитального ремонта', 'about'),
      genLi('Проекты', 'else'),
    ],
  }

  function mockPostLinksListData(index) {
    return {
      name: `Проекты по разделам и назначению`,
      items: [
        { name: `Архитектурное проектирование`, link: 'http://ya.ru' },
        { name: `Архитектурно градостроительный облик`, link: 'http://ya.ru' },
        { name: `lorem ${index * 10 + 3}`, link: 'http://ya.ru' },
        { name: `lorem ${index * 10 + 4}`, link: 'http://ya.ru' },
        { name: `lorem ${index * 10 + 5}`, link: 'http://ya.ru' },
      ],
    }
  }
  const _postLinksList = {
    json: () => [
      mockPostLinksListData(1),
      mockPostLinksListData(2),
      mockPostLinksListData(3),
      mockPostLinksListData(5),
    ],
  }

  const _news = {
    json: () => [
      createNews(
        'Узаконить индивидуальное жилое строение через суд (ИЖС)',
        'Узаконить индивидуальное жилое строение через суд (ИЖС)   Понятие незаконной постройки определяется в 222 статье ГК РФ.'
      ),
      createNews(
        'заголовок',
        'описание',
        'https://dummyimage.com/70x60/000/fff'
      ),
    ],
  }

  function createNews(
    title = 'title',
    description = 'description',
    imgSrc = null,
    date = '2017-05-03',
    looks = 555,
    link = 'http://ya.ru'
  ) {
    return {
      title,
      description,
      date,
      looks,
      link,
      imgSrc,
    }
  }
  /** --data mocks-- */

  export async function preload() {
    const [{ name }, navList, postLinksList, news] = await Promise.all(
      (
        await Promise.all([
          this.fetch(process.env.SAPPER_APP_API_URL),
          _navList,
          _postLinksList,
          _news,
        ])
      ).map(data => data.json())
    )

    return { siteData: { name, navList, postLinksList, news } }
  }
</script>

<script>
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import { globalData } from '../store'
  import Aside from '../components/Aside.svelte'

  export let segment
  export let siteData
  globalData.set(siteData)
</script>

<style lang="scss">
  @import 'varibales';
  .content {
    display: flex;
  }

  main {
    padding-left: 30px;

    flex-grow: 1;
    flex-basis: 0;
    font-family: Verdana, serif;

    @media (max-width: $first-break-point) {
      padding-left: 0;
    }
  }
</style>

<Header {segment} navList={$globalData.navList} />

<div class="content container">
  <Aside postLinksList={$globalData.postLinksList} news={$globalData.news} />

  <main itemscope itemprop="mainContentOfPage">
    <slot />
  </main>
</div>

<Footer />
