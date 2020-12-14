<script>
  import Article from './Article.svelte'
  import { contentTypeToFrontUrl } from '../helpers/types_urls'

  export let posts = []
</script>

<style lang="scss">
  @import 'varibales';
  a:hover {
    color: #23527c;
    text-decoration: underline;
  }

  .all-posts-wrapper {
    position: relative;
  }

  .all-posts-wrapper:not(:first-of-type) {
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

  .all-posts-link {
    margin-top: 26px;
    text-align: right;
    display: block;
  }
</style>

{#each posts as singlePost}
  <div class="all-posts-wrapper">
    <Article>
      <div slot="header" class="header">
        <img
          itemprop="image"
          class="image"
          src={singlePost.thumbnail ? singlePost.thumbnail : '/noimg.jpg'}
          alt={singlePost.title || 'no-image'} />
        <div class="content">
          <a
            rel="prefetch"
            href={contentTypeToFrontUrl(singlePost)}
            itemprop="name">
            {singlePost.post_title}
          </a>
          {#if singlePost.short_desc}
            <span itemprop="description">{singlePost.short_desc}</span>
          {/if}
        </div>
      </div>

      <div slot="footer" class="footer">
        <span
          itemprop="datePublished"
          content={new Date(singlePost.date).toISOString()}>
          <i class="fa fa-file-text-o" />
          {new Date(singlePost.date).toCustom()}
        </span>

        <div class="more">
          <a rel="prefetch" href={contentTypeToFrontUrl(singlePost)} itemprop="url">
            Подробнее
          </a>
        </div>
      </div>
    </Article>
  </div>
{/each}

<a href="/posts" class="all-posts-link">Все статьи</a>

