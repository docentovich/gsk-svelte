<script>
  import { goto } from '@sapper/app'
  import { stores } from '@sapper/app'
  const { page } = stores()

  function handleSubmit(event) {
    goto(`/search?q=${event.target.search.value}`)
  }
</script>

<style lang="scss">
  input {
    width: 100%;
    height: 28px;
    padding: 3px;

    box-sizing: border-box;
    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.75);
    border: none;
    &::placeholder {
      color: #ccc;
    }
  }

  .wrapper {
    width: 100%;
    position: relative;

    &:after {
      right: 10px;
      top: 2px;

      color: #d0d0d0;
      position: absolute;
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: '\f002';
      display: block;
    }
  }
</style>

<div class="wrapper">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Поиск"
      value={($page.query.q) ? $page.query.q : ''}
       />
  </form>
</div>
