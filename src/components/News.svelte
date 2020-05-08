<script>
  import Article from './Article.svelte'
  import { contentTypeToFrontUrl } from '../helpers/types_urls'

  export let news = []
</script>

<style lang="scss">
  @import 'varibales';
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
          src={singleNews.image.guid ? singleNews.image.guid : '/noimg.jpg'}
          alt={singleNews.title} />
        <div class="content">
          <a
            rel="prefetch"
            href={contentTypeToFrontUrl(singleNews)}
            itemprop="name">
            {singleNews.title.rendered}
          </a>
          {#if singleNews.short_desc}
            <span itemprop="description">{singleNews.short_desc}</span>
          {/if}
        </div>
      </div>

      <div slot="footer" class="footer">
        <time
          itemprop="datePublished"
          content={new Date(singleNews.date).toISOString()}>
          <i class="fa fa-file-text-o" />
          {new Date(singleNews.date).toCustom()}
        </time>

        {#if singleNews.custom_fields.watch_counter}
          <div class="looks">
            <i class="fa fa-eye" />
            {singleNews.custom_fields.watch_counter}
          </div>
        {/if}

        <div class="more">
          <a rel="prefetch" href={'news/' + singleNews.slug} itemprop="url">
            Подробнее
          </a>
        </div>
      </div>
    </Article>
  </div>
{/each}
