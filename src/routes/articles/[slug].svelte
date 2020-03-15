<script context="module">
    import { apiUrlV2 } from 'constants';

    export async function preload({ params, query }) {
        const data = await (await this.fetch( `${apiUrlV2}/posts?slug=${params.slug}`)).json();

        return { post: data[0] };
    }
</script>

<script>
    export let post;
</script>

<h1>{ post.title.rendered }</h1>

<div class="content">
    {@html post.content.rendered }
</div>