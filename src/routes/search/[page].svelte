<script context="module">
  import { goto } from '@sapper/app'
  import { apiUrlV2 } from '../../helpers/constants'

  function generatePagination(limit, total) {
    return Array.from(Array(Math.ceil(total / limit)), (_, i) => ++i)
  }

  export async function preload({ params, query }) {
    const keyWord = query['key_word'] || ''
    const limit = query['limit'] || 10
    const currentPage = +(params['page'] || 1)
    const content = await (
      await this.fetch(
        `${apiUrlV2}/custom_routes/search?key_word=${keyWord}&page=${currentPage}&limit=${limit}`
      )
    ).json()

    return {
      results: content.values,
      total: content.total,
      currentPage,
      limit,
      keyWord,
      pages: generatePagination(limit, content.total),
    }
  }
</script>

<script>
  import SearchInput from '../../components/SearchInput.svelte'
  import Article from '../../components/Article.svelte'
  import MainInnerPage from '../../components/MainInnerPage.svelte'

  export let results
  export let total
  export let currentPage
  export let pages
  export let limit
  export let keyWord
  export let totalPages
  $: totalPages = Math.ceil(total / limit)

  export function changeLimitation(event) {
    goto(genUrl(1, event.target.value))
  }

  export function genUrl(_page = 1, _limit = null) {
    _limit = _limit || limit
    return `/search/${_page}?key_word=${keyWord}&limit=${limit}`
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

  .search-input {
    width: 250px;
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
  <div class="search-input">
    <SearchInput />
  </div>

  <div class="total-results">
    Всего:
    <span>{total}</span>
    результат найден
  </div>

  <div class="current-page">page {currentPage} of {totalPages}</div>

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
      <a rel="prefetch" href={genUrl()}>Start</a>
      <a rel="prefetch" href={genUrl(currentPage - 1)}>Prev</a>
    {/if}

    {#each pages as page}
      {#if page === currentPage}
        <span>{page}</span>
      {:else}
        <a rel="prefetch" href={genUrl(page)}>{page}</a>
      {/if}
    {/each}

    {#if currentPage !== pages.length}
      <a rel="prefetch" href={genUrl(currentPage + 1)}>Next</a>
      <a rel="prefetch" href={genUrl(pages.length)}>End</a>
    {/if}
  </div>
</MainInnerPage>
