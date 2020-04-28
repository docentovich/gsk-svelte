<script>
  import { types } from '../helpers/types'
  export let categoriesMenu = []
</script>

<style lang="scss">
  @import 'varibales';
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .wrapper {
    margin: -15px 0;
  }

  ul.first-level {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: $brown-font-color;

    & > li {
      max-width: 190px;
      margin: 13px 5px;

      @media (max-width: $second-break-point) {
        width: 100%;
        max-width: 100%;
      }
    }

    & > li > span {
      padding-bottom: 10px;
      min-height: 30px;
      line-height: 19px;

      display: inline-block;
      font-size: 13px;
      font-weight: 600;
    }
  }

  ul.second-level > li {
    padding-left: 28px;
    margin: 15px 0;

    font-size: 13px;
    vertical-align: middle;
    position: relative;

    &:before {
      left: -5px;
      width: 25px;
      height: 25px;
      border: 2px solid #959595;
      border-radius: 50%;

      display: inline-block;
      content: '\f054';
      font-family: FontAwesome;
      color: #959595;
      position: absolute;
      text-align: center;
      font-size: 15px;
      box-sizing: border-box;
    }

    a {
      text-decoration: none;

      &:hover {
        color: #23527c;
        text-decoration: underline;
      }
    }
  }
</style>

<div class="wrapper">
  <ul
    class="first-level"
    itemscope
    itemtype="http://schema.org/SiteNavigationElement">
    {#each categoriesMenu as category}
      <li>
        <span>{category.title}</span>
        <ul class="second-level">
          {#each category.child_items as post}
            <li>
              <a href={`${types[post.type]}/${post.slug}`} } itemprop="url">
                {post.title}
              </a>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</div>
