<script>
  import DisplayIf from './DisplayIf.svelte'
  let activeLi = null

  function toggleActive(li) {
    activeLi = activeLi === li ? null : li
  }
  export let postLinksList = []
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
    }
  }
</style>

<ul class="first-level" itemscope itemtype="http://schema.org/SiteNavigationElement">
  {#each postLinksList as li}
    <li class={activeLi === li ? 'opened' : ''}>
      <span on:click={() => toggleActive(li)}>{li.name}</span>
      {#if li.items && li.items.length > 0}
        <DisplayIf display={activeLi === li}>
          <ul class="second-level">
            {#each li.items as subLi}
              <li>
                <a href={subLi.link} itemprop="url">{subLi.name}</a>
              </li>
            {/each}
          </ul>
        </DisplayIf>
      {/if}
    </li>
  {/each}
</ul>
