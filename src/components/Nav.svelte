<script>
  import { contentTypeToFrontUrl } from '../helpers/types_urls'

  export let path
  export let navList = []
</script>

<style lang="scss">
  @import 'varibales';
  nav {
    min-height: auto;
    border-bottom: 5px solid #9c7e79;
    margin-bottom: 20px;
    padding-top: 5px;

    display: block;
    background: rgba(150, 140, 133, 0.1);
    box-shadow: 0 30px 20px -20px rgba(0, 0, 0, 0.21);
  }

  ul {
    padding: 0;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  li {
    padding: 0;
    margin: 0 35px;

    list-style: none;
    text-align: center;
  }

  a {
    max-width: 220px;

    display: table-cell;
    text-decoration: none;
    font-family: Gabriolaa, serif;
    font-size: 25px;
    border-radius: 15px 15px 0 0;
    padding: 5px 12px;
    height: 40px;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: 17px;

    &[aria-current='page'],
    &:hover {
      color: #fff;
      box-shadow: 0 0 5px rgba(225, 219, 201, 0.75);
      background-image: linear-gradient(to bottom, #4f2b25 0, #9b7d79 100%);
    }

    @media (max-width: $first-break-point) {
      border-radius: 15px;
      margin-bottom: 10px;
      display: block;
    }
  }
</style>

<nav itemscope itemtype="http://schema.org/SiteNavigationElement">
  <ul class="container">
    {#each navList as navItem}
      <li>
        <a
          rel="prefetch"
          itemprop="url"
          aria-current={path === contentTypeToFrontUrl(navItem) ? 'page' : undefined}
          href={contentTypeToFrontUrl(navItem)}>
          <span itemprop="name">{navItem.title}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>
