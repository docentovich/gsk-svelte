<script>
  import DisplayIf from './DisplayIf.svelte'
  import { contentTypeToFrontUrl } from '../helpers/types_urls'

  let _activeCategory = null

  function _toggleActive(category) {
    _activeCategory = _activeCategory === category ? null : category
  }

  export let categoriesMenu = []
  export let path

  export function isCategoryActive(category, _path, _activeCategory) {
    return (
      _activeCategory === category ||
      category.child_items.some(post => _path === contentTypeToFrontUrl(post))
    )
  }
</script>

<style lang="scss">
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    width: 100%;

    list-style: none;
    display: block;

    span {
      cursor: pointer;
    }
  }

  ul.first-level {
    padding-left: 15px;
  }

  ul.first-level > li {
    margin-top: 10px;

    position: relative;
    font-family: Gabriolaa, serif;
    font-size: 27px;
    color: #000;
    line-height: 33px;

    &:before {
      left: -18px;
      top: 10px;
      width: 10px;
      height: 10px;

      background: url('/dot.png');
      content: ' ';
      position: absolute;
    }

    &.opened {
      color: #63372f !important;
    }

    &.opened > span:after {
      transform: rotate(90deg);
    }
  }

  ul.first-level > li > span {
    display: block;
    width: 100%;

    &:before {
    }

    &:after {
      display: block;
      position: absolute;
      right: -5px;
      top: 0;
      content: '\f054';
      font-family: FontAwesome;
      transition: all 0.2s linear;
      font-size: 15px;
    }
  }

  ul.second-level > li {
    margin-bottom: 10px;

    line-height: 23px;

    &:before {
      content: '-';
      display: inline;
      padding-right: 5px;
    }

    a {
      font-size: 22px;
      text-decoration: none;

      &[aria-current='page'] {
        border-bottom: 1px dashed #63372f;
      }
    }
  }
</style>

<ul
  class="first-level"
  itemscope
  itemtype="http://schema.org/SiteNavigationElement">
  {#each categoriesMenu as category}
    <li
      class={isCategoryActive(category, path, _activeCategory) ? 'opened' : ''}>
      <span on:click={() => _toggleActive(category)}>{category.title}</span>
      {#if category.child_items && category.child_items.length > 0}
        <DisplayIf display={isCategoryActive(category, path, _activeCategory)}>
          <ul class="second-level">
            {#each category.child_items as post}
              <li>
                <a
                  aria-current={path === contentTypeToFrontUrl(post) ? 'page' : undefined}
                  href={contentTypeToFrontUrl(post)}
                  rel=prefetch
                  itemprop="url">
                  {post.title}
                </a>
              </li>
            {/each}
          </ul>
        </DisplayIf>
      {/if}
    </li>
  {/each}
</ul>
