<script>
  import Widget from './Widget.svelte'
  import PostLinksAccordion from './PostLinksAccordion.svelte'
  import News from './News.svelte'

  export let postLinksList
  export let news
  export let open = false
</script>

<style lang="scss">
  @import 'varibales';
  aside.desktop {
    width: 262px;

    display: block;
    flex-shrink: 0;
  }

  aside.mobile {
    width: 100%;
    height: 100%;
    left: -100%;
    top: 0;
    z-index: 2;

    display: none;
    position: fixed;
    transition: 0.5s ease-in-out left;
    background: #eee;
    overflow-y: scroll;

    &.open {
      left: 0;
    }
  }

  aside.mobile .mobile-wrapper {
    width: 360px;
    margin: 20px auto 40px auto;
  }

  .burger-button {
    top: 25px;
    right: 25px;
    width: 42px;
    height: 34px;

    z-index: 20;
    border-style: none;
    position: fixed;
    outline: none;
    display: none;
    background: white;
    box-sizing: border-box;

    svg line {
      stroke: currentColor;
      stroke-width: 3;
      transition: transform 0.3s ease-in-out;
    }

    svg {
      min-height: 24px;
      transition: transform 0.3s ease-in-out;
    }

    &.open svg {
      transform: scale(0.7);
    }

    &.open #top {
      transform: translate(6px, 0px) rotate(45deg);
    }

    &.open #middle {
      opacity: 0;
    }

    &.open #bottom {
      transform: translate(-12px, 9px) rotate(-45deg);
    }
  }

  @media (max-width: $first-break-point) {
    aside.desktop {
      display: none;
    }

    aside.mobile {
      display: block;
    }

    .burger-button {
      display: block;
    }
  }
</style>

<aside class="desktop">
  <Widget header="Меню сайта">
    <PostLinksAccordion {postLinksList} />
  </Widget>
  {#if news && news.length > 0}
    <Widget header="Последние статьи">
      <News {news} />
    </Widget>
  {/if}
</aside>

<button class="burger-button" class:open on:click={() => (open = !open)}>
  <svg width="32" height="24">
    <line id="top" x1="0" y1="2" x2="32" y2="2" />
    <line id="middle" x1="0" y1="12" x2="24" y2="12" />
    <line id="bottom" x1="0" y1="22" x2="32" y2="22" />
  </svg>
</button>

<aside class="mobile" class:open>
  <div class="mobile-wrapper">
    <PostLinksAccordion {postLinksList} />
  </div>
  {#if news && news.length > 0}
    <div class="mobile-wrapper">
      <News {news} />
    </div>
  {/if}
</aside>
