<script context="module">
  Date.prototype.toCustom = function() {
    let day = new Date().getDay()
    day = day < 10 ? `0${day}` : day
    let month = new Date().getMonth()
    month = month < 10 ? `0${month}` : month
    const year = new Date().getFullYear()
    return `${year}-${month}-${month}`
  }

  export async function preload(page) {
    const menuAliases = {
      categoriesMenu: 5, //'categories-menu',
      navMenu: 4, //'nav-menu',
    }
    const { path } = page

    if (path.endsWith('/') && path.length > 1) {
      this.redirect(301, encodeURI(path.slice(0, -1)))
    }

    const [navList, categoriesMenu, news] = await Promise.all(
      (
        await Promise.all([
          this.fetch(
              '/api/menus/v1/menus/' +
              menuAliases.navMenu
          ),
          this.fetch(
              '/api/menus/v1/menus/' +
              menuAliases.categoriesMenu
          ),
          this.fetch('/api/wp/v2/news?per_page=2'),
        ])
      ).map(data => data.json())
    )

    return { siteData: { navList, categoriesMenu, news } }
  }
</script>

<script>
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import { globalData } from '../store'
  import Aside from '../components/Aside.svelte'
  import { stores } from '@sapper/app'

  const { page } = stores()

  export let siteData
  globalData.set(siteData)
</script>

<style lang="scss">
  @import 'varibales';
  .content {
    display: flex;
  }

  :global(main) {
    padding-left: 30px;

    flex-grow: 1;
    flex-basis: 0;
    font-family: Verdana, serif;

    @media (max-width: $first-break-point) {
      padding-left: 0;
    }
  }
</style>

<Header
  path={$page.path}
  navList={$globalData.navList && $globalData.navList.items} />

<div class="content container">
  <Aside
    path={$page.path}
    categoriesMenu={$globalData.categoriesMenu && $globalData.categoriesMenu.items}
    news={$globalData.news} />

  <slot />
</div>

<Footer />
