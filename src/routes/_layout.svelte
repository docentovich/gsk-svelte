<script context="module">
  import { apiUrlV2 } from '../helpers/constants'

  export async function preload() {
    const menuAliases = {
      categoriesMenu: 'categories-menu',
      navMenu: 'nav-menu',
    }
    const [/*{ name }, */ navList, categoriesMenu, news] = await Promise.all(
      (
        await Promise.all([
          // this.fetch(process.env.SAPPER_APP_API_URL),
          this.fetch(
            process.env.SAPPER_APP_API_URL +
              'menus/v1/menus/' +
              menuAliases.navMenu
          ),
          this.fetch(
            process.env.SAPPER_APP_API_URL +
              'menus/v1/menus/' +
              menuAliases.categoriesMenu
          ),
          this.fetch(apiUrlV2 + '/news?per_page=2'),
        ])
      ).map(data => data.json())
    )

    return { siteData: { /*name, */ navList, categoriesMenu, news } }
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

<Header {segment} navList={$globalData.navList && $globalData.navList.items} />

<div class="content container">
  <Aside
    categoriesMenu={$globalData.categoriesMenu && $globalData.categoriesMenu.items}
    news={$globalData.news} />

  <main itemscope itemprop="mainContentOfPage">
    <slot />
  </main>
</div>

<Footer />
