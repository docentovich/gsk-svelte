<script>
  let _slots = $$props.$$slots
  _slots = _slots || { fromSSR: true }
</script>

<article
  class="content"
  itemscope
  itemtype="http://schema.org/Article"
  itemref="organization author">

  {#if _slots.fromSSR || _slots.header}
    <header itemprop="name headline">
      <slot name="header" />
    </header>
  {/if}

  {#if _slots.fromSSR || _slots.description}
    <div itemprop="description">
      <slot name="description" />
    </div>
  {/if}

  <div itemprop="articleBody">
    <slot />
  </div>

  {#if _slots.fromSSR || _slots.footer}
    <footer>
      <slot name="footer" />
    </footer>
  {/if}


  <meta itemprop="datePublished" content="20200419T000000+0300" />
</article>
