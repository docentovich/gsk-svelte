<script>
  let slots = $$props.$$slots
  slots = slots || { fromSSR: true }
</script>

<article
  class="content"
  itemscope
  itemtype="http://schema.org/Article"
  itemref="organization author">

  {#if slots.fromSSR || slots.header}
    <header itemprop="name headline">
      <slot name="header" />
    </header>
  {/if}

  {#if slots.fromSSR || slots.description}
    <div itemprop="description">
      <slot name="description" />
    </div>
  {/if}

  <div itemprop="articleBody">
    <slot />
  </div>

  {#if slots.fromSSR || slots.footer}
    <footer>
      <slot name="footer" />
    </footer>
  {/if}


  <meta itemprop="datePublished" content="20200419T000000+0300" />
</article>
