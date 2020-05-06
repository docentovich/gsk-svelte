<script context="module">
    import { apiUrlV2 } from '../../helpers/constants'

    export async function preload(page, session) {
        const { slug } = page.params;
        const news = await ((await this.fetch(`${apiUrlV2}/custom_routes/news/${slug}`)).json());

        return { news }
    }
</script>

<script>
    export let news
    console.log(news);
</script>

{@html news.content.rendered}
