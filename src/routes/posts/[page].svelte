<script context="module">
  import { goto } from '@sapper/app'

  function generatePagination(limit, total) {
    return Array.from(Array(Math.ceil(total / limit)), (_, i) => ++i)
  }

  export async function preload({ params, query }) {

    const limit = query['limit'] || 10
    const currentPage = +(params['page'] || 1)
    const content = await (
      await this.fetch(
        `/api/wp/v2/custom_routes/all_posts?page=${currentPage}&limit=${limit}`
      )
    ).json()

    return {
      results: content.values,
      total: content.total,
      currentPage,
      limit,
      pages: generatePagination(limit, content.total),
    }
  }
</script>

<script>
  import Article from '../../components/Article.svelte'
  import MainInnerPage from '../../components/MainInnerPage.svelte'

  export let results
  export let total
  export let currentPage
  export let pages
  export let limit
  export let totalPages
  $: totalPages = Math.ceil(total / limit)

  export function changeLimitation(event) {
    goto(genUrl(1, event.target.value))
  }

  export function genUrl(_page = 1, _limit = null) {
    _limit = _limit || limit
    return `/posts/${_page}?limit=${_limit}`
  }
</script>

<style lang="scss">
  .results {
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 30px 0 0 0;

      display: block;
      list-style: none;
      font-size: 12px;
    }

    li a {
      color: #337ab7;
    }
  }

  .per-page,
  .pagination,
  .total-results {
    margin-top: 15px;

    display: block;
    font-size: 12px;
  }

  .pagination > * {
    padding: 7px;
  }
</style>

<MainInnerPage>


  <div class="total-results">
    Всего:
    <span>{total}</span>
    результат найден
  </div>

  <div class="current-page">страница {currentPage} из {totalPages}</div>

  <label class="per-page">
    Отображать по:
    <select bind:value={limit} on:change={changeLimitation}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </label>

  <ul class="results">
    {#each results as result, index}
      <li>
        <Article>
          <div slot="header" class="header">
            <span>{++index}.</span>
            <a rel="prefetch" href="/{result.slug}">{result.post_title}</a>
          </div>
          <div slot="description" class="header">{result.post_content}</div>
        </Article>
      </li>
    {/each}
  </ul>

  <div class="pagination">
    {#if currentPage !== 1}
      <a rel="prefetch" href={genUrl()}>Начало</a>
      <a rel="prefetch" href={genUrl(currentPage - 1)}>Пред.</a>
    {/if}

    {#each pages as page}
      {#if page === currentPage}
        <span>{page}</span>
      {:else}
        <a rel="prefetch" href={genUrl(page)}>{page}</a>
      {/if}
    {/each}

    {#if currentPage !== pages.length}
      <a rel="prefetch" href={genUrl(currentPage + 1)}>След.</a>
      <a rel="prefetch" href={genUrl(pages.length)}>Конец</a>
    {/if}
  </div>
</MainInnerPage>
