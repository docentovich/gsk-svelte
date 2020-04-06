<script>
    import DisplayIf from './DisplayIf.svelte';

    const data = [
        mockData(1),
        mockData(2),
        mockData(3),
        mockData(4),
        mockData(5),
    ];

    function mockData(index) {
        return {
            name: `Taxonomy ${index}`,
            items: [
                {name: `lorem ${(index * 10) + 1}`},
                {name: `lorem ${(index * 10) + 2}`},
                {name: `lorem ${(index * 10) + 3}`},
                {name: `lorem ${(index * 10) + 4}`},
                {name: `lorem ${(index * 10) + 5}`},
            ]
        }
    }

    let displayList = null;

    function toggleActive(index) {
        displayList = displayList === index ? null : index;
        console.log(displayList);
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
        padding-left: 20px
    }
</style>
<ul>
  {#each data as li, index}
      <li>
          <span on:click={ () => toggleActive(index) }>{li.name}</span>
        {#if li.items && li.items.length > 0}
            <DisplayIf display="{ displayList === index }">
                <ul>
                  {#each li.items as subLi}
                      <li>{ subLi.name }</li>
                  {/each}
                </ul>
            </DisplayIf>
        {/if}
      </li>
  {/each}
</ul>
