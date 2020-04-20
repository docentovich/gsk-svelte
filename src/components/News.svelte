<script>
  import Article from './Article.svelte'
  export let news = []
</script>

<style lang="scss">
  @import "varibales";
  a:hover {
    color: #23527c;
    text-decoration: underline;
  }

  .news-wrapper {
    position: relative;
  }

  .news-wrapper:not(:first-of-type) {
    margin-top: 20px;
  }

  .header,
  .footer {
    color: $brown-font-color;
    font-family: MyriadPro, serif;
  }

  .header {
    display: flex;
  }

  .header .image {
    height: 100%;
    border: 1px solid #552d26;
    width: 55px;
    margin-right: 5px;
  }

  .header .content {
    & > * {
      width: 100%;
      display: block;
    }

    a {
      font-size: 16px;
      line-height: 22px;
    }

    span {
      font-size: 13px;
      font-style: italic;
      line-height: 15px;
    }
  }

  .footer {
    margin-top: 15px;

    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }
</style>

{#each news as singleNews}
  <div class="news-wrapper">

    <Article>
      <div slot="header" class="header">
        <img
          itemprop="image"
          class="image"
          src={singleNews.imgSrc ? singleNews.imgSrc : '/noimg.jpg'}
          alt={singleNews.title} />
        <div class="content">
          <a href={singleNews.link} itemprop="name">{singleNews.title}</a>
          <span itemprop="description">{singleNews.description}</span>
        </div>
      </div>

      <div slot="footer" class="footer">
        <time
          itemprop="datePublished"
          content={new Date(singleNews.date).toISOString()}>
          <i class="fa fa-file-text-o" />
          {singleNews.date}
        </time>

        <div class="looks">
          <i class="fa fa-eye" />
          {singleNews.looks}
        </div>

        <div class="more">
          <a href={singleNews.link} itemprop="url">Подробнее</a>
        </div>
      </div>
    </Article>
  </div>
{/each}
