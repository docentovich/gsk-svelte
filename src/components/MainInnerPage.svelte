<style lang="scss">
  main :global(img) {
      width: auto;
      height: auto;
      max-width: 100%;
  }
  main :global(h1) {
    margin-bottom: 15px;

    font-family: verdana, geneva, sans-serif;
    font-size: 18px;
  }
</style>

<main itemscope itemprop="mainContentOfPage">
  <slot />
</main>
