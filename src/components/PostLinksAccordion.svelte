<script>
  import DisplayIf from './DisplayIf.svelte'

  const data = [mockData(1), mockData(2), mockData(3), mockData(4), mockData(5)]

  function mockData(index) {
    return {
      name: `Taxonomy ${index}`,
      items: [
        { name: `lorem ${index * 10 + 1}` },
        { name: `lorem ${index * 10 + 2}` },
        { name: `lorem ${index * 10 + 3}` },
        { name: `lorem ${index * 10 + 4}` },
        { name: `lorem ${index * 10 + 5}` },
      ],
    }
  }

  let activeLi = null

  function toggleActive(li) {
    activeLi = activeLi === li ? null : li
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

  ul ul {
    padding-left: 20px;
  }
</style>

<ul>
  {#each data as li}
    <li>
      <span on:click={() => toggleActive(li)}>{li.name}</span>
      {#if li.items && li.items.length > 0}
        <DisplayIf display={activeLi === li}>
          <ul>
            {#each li.items as subLi}
              <li>{subLi.name}</li>
            {/each}
          </ul>
        </DisplayIf>
      {/if}
    </li>
  {/each}
</ul>
