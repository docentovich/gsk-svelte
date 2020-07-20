<style lang="scss">
  main :global(img) {
      width: auto;
      height: auto;
      max-width: 100%;
  }
  main :global(h1) {
    padding-bottom: 9px;
    margin: 0 0 29px 0;

    font-size: 27px;
  }

  main :global(h2) {
    font-size: 16px;
  }

  main :global(h3) {
    font-size: 13px;
  }

  main :global(h1),
  main :global(h2) {
    width: auto;

    font-family: verdana, geneva, sans-serif;
  }
</style>

<main itemscope itemprop="mainContentOfPage">
  <slot />
</main>
