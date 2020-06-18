<script>
  import SearchInput from '../components/SearchInput.svelte'
  import Article from '../components/Article.svelte'
  import MainInnerPage from '../components/MainInnerPage.svelte'
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
</style>

<MainInnerPage>
  <div class="search-input">
    <SearchInput />
  </div>

  <div class="total-results">
    Всего:
    <span>51</span>
    результат найден
  </div>

  <div class="current-page">page 2 of 3</div>

  <label class="per-page">
    Отображать по:
    <select name="" id="">
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </label>

  <ul class="results">
    <li>
      <Article>
        <div slot="header" class="header">
          <span>1.</span>
          <a href="/">
            Проектирование и согласование предприятий общественного питания:
            ресторанов, кафе, баров, столовых
          </a>
        </div>
        <div slot="description" class="header">
          ... общественного питания. 2 этап. Разработка проекта ресторана,
          столовой или кафе. Разработанные технологические решения позволяют
          специалистам ООО «ГСК-Строй» приступить к разработке следующих
          разделов ...
        </div>
      </Article>
    </li>
    <li>
      <Article>
        <div slot="header" class="header">
          <span>1.</span>
          <a href="/">
            Проектирование и согласование предприятий общественного питания:
            ресторанов, кафе, баров, столовых
          </a>
        </div>
        <div slot="description" class="header">
          ... общественного питания. 2 этап. Разработка проекта ресторана,
          столовой или кафе. Разработанные технологические решения позволяют
          специалистам ООО «ГСК-Строй» приступить к разработке следующих
          разделов ...
        </div>
      </Article>
    </li>
  </ul>

  <div class="pagination">
    <a href="/">Start</a>
    <a href="/">Prev</a>
    <a href="/">1</a>
    <span>2</span>
    <a href="/">3</a>
    <a href="/">Next</a>
    <a href="/">End</a>
  </div>
</MainInnerPage>
