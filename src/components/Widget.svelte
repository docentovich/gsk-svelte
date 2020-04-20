<script>
  export let header
</script>

<style lang="scss">
  .wrapper {
    margin-bottom: 25px;

    border-radius: 15px;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.75);
    background-image: linear-gradient(#cacaca, #ededed);
  }

  .inner {
    padding: 15px 10px 30px;

    border-radius: 15px;
    background: url('/domiki.png') bottom no-repeat;
  }

  header {
    font-family: Gabriolaa, serif;
    color: #552d26;
    font-size: 35px;
    text-align: center;
  }
</style>

<div class="wrapper">
  <article class="inner">
    {#if !!header}
      <header>{header}</header>
    {/if}
    <div class="content">
      <slot />
    </div>
  </article>
</div>
