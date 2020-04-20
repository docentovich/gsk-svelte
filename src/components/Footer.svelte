<style lang="scss">
  @import 'varibales';
  footer {
    padding: 10px 0;
    border-top: 5px solid #9c7e79;
    font-family: MyriadPro, serif;
    font-size: 18px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > * {
      text-align: center;
      margin: 10px 0;

      @media (max-width: $first-break-point) {
        margin: 10px auto;
      }
    }
  }

  .address {
    max-width: 360px;
    text-align: center;

    & > * {
      display: inline;
      font-style: normal;
    }
  }

  .contacts a {
    display: block;
    text-decoration: none;
    text-align: right;
  }
</style>

<footer>
  <div class="container">
    <div class="links">
      <a href="/sitemap">
        <img src="sm.png" alt="карта сайта" />
      </a>
    </div>

    <div class="address">
      <span id="author" itemprop="author">Гск-проект.</span>
      <address
        id="address"
        itemprop="address"
        itemscope
        itemtype="http://schema.org/PostalAddress">
        <span itemprop="streetAddress">
          Набережная Обводного Канала дом 150.
        </span>
        <span itemprop="postalCode">192168</span>
        <span itemprop="addressLocality">г. Санкт-Петербург</span>
      </address>
    </div>

    <div class="contacts">
      <a href="tel:(812) 628-93-95">(812) 628-93-95</a>
      <a href="tel:gsk-stroy@mail.ru" id="email" itemprop="email">
        gsk-stroy@mail.ru
      </a>
    </div>
  </div>
</footer>
