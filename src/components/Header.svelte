<script>
  import Nav from '../components/Nav.svelte'
  import SearchInput from './SearchInput.svelte'

  export let path
  export let navList
</script>

<style lang="scss">
  @import 'varibales';
  header .container {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }

  #logo {
    height: 127px;
    text-align: left;

    @media (max-width: $second-break-point) {
      width: 100%;
      text-align: center;
    }

    img {
      height: 100%;
    }
  }

  .slogan {
    margin: 0 10px;
    flex-basis: 0;
    flex-grow: 1;

    line-height: 63px;
    font-family: 'Andantino', sans-serif;
    text-shadow: 0 3px 7px rgba(0, 0, 0, 0.35);
    font-size: 50px;
    font-weight: 400;
    color: #5f2a21;
    text-align: center;
    text-decoration: none;

    @media (max-width: $first-break-point) {
      font-size: 40px;
    }

    @media (max-width: $second-break-point) {
      width: 100%;
      flex-basis: auto;

      font-size: 37px;
    }
  }

  .right-panel {
    flex-grow: 0;
    width: 196px;

    & > * {
      margin-bottom: 8px;
      width: 100%;
      display: block;
    }

    @media (max-width: $second-break-point) {
      margin: auto;
    }
  }

  .right-panel .phone {
    display: flex;
    align-content: center;
    align-items: center;

    font-size: 20px;
    font-weight: bold;
    font-family: Times, serif;
    text-decoration: none;

    &:before {
      height: 51px;
      width: 51px;
      padding-left: 10px;

      content: '';
      display: block;
      background: url('/phone-big.png') no-repeat;
    }
  }

  .right-panel .contact-button {
    height: 31px;

    position: relative;
    box-sizing: border-box;
    display: block;
    text-align: center;
    font-size: 21px;
    font-family: Times, serif;
    color: #4a231d;
    text-decoration: none;
    border: 1px solid #4a231d;
    border-radius: 17px;
    background-image: linear-gradient(transparent 0%, #c7c5c5 100%);
    transition: all 300ms ease;

    &:hover {
      background-color: #4a231d;
    }

    &:before {
      left: 26px;
      top: 6px;
      width: 11px;
      height: 17px;

      content: '';
      display: block;
      position: absolute;
      background-image: url('/pointer.png');
    }
  }
</style>

<header>
  <div
    id="organization"
    class="container"
    itemprop="publisher"
    itemscope
    itemtype="http://schema.org/Organization"
    itemref="address email">
    <a
      href="/"
      id="logo"
      itemprop="logo"
      itemscope
      itemtype="http://schema.org/ImageObject">
      <img src="/logo.png" alt="Гор-строй комплекс. Строительная организация" />
      <meta itemprop="url" content="/logo.png" />
      <meta itemprop="width" content="400" />
      <meta itemprop="height" content="60" />
      <meta
        itemprop="description"
        content="Гор-строй комплекс. Строительная организация" />
    </a>

    <a class="slogan" href="." itemprop="url">Проектирование и согласование</a>

    <div class="right-panel">
      <a class="phone" href="tel:88126289395" itemprop="telephone">
        (812) 628-93-95
      </a>
      <a class="contact-button" href="/contacts" rel="prefetch">Контакты</a>
      <div>
        <SearchInput />
      </div>
    </div>

    <meta itemprop="name" content="Гор-строй комплекс" />
  </div>

  <Nav {path} {navList} />
</header>
