<script context="module">
  Date.prototype.toCustom = function() {
    let day = this.getDate()
    day = day < 10 ? `0${day}` : day
    let month = this.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    const year = this.getFullYear()
    return `${year}-${month}-${day}`
  }

  export async function preload(page) {
    const menuAliases = {
      mainMenu: 47, //'categories-menu',
      navMenu: 48, //'nav-menu',
    }
    const { path } = page

    if (path.endsWith('/') && path.length > 1) {
      this.redirect(301, encodeURI(path.slice(0, -1)))
    }

    let [navList, categoriesMenu, posts] = await Promise.all(
      (
        await Promise.all([
          this.fetch(
              '/api/menus/v1/menus/' +
              menuAliases.navMenu
          ),
          this.fetch(
              '/api/menus/v1/menus/' +
              menuAliases.mainMenu
          ),
          this.fetch('/api/wp/v2/custom_routes/all_posts?per_page=2'),
        ])
      ).map(data => data.json())
    )

    posts = (posts || {}).values || [];

    return { siteData: { navList, categoriesMenu, posts } }
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
    posts={$globalData.posts} />

  <slot />
</div>

<Footer />
