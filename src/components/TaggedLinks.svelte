<script>
    import { onMount } from 'svelte';
    import { apiUrlV2 } from 'constants';

    let posts = [];

    onMount(async function () {
        posts = await (await fetch(apiUrlV2 + '/posts')).json();
    });
</script>

<ul>
    {#each posts as post}
        <li>
            <a href="/articles/{post.slug}" rel="prefetch">{post.title.rendered}</a>
        </li>
    {/each}
</ul>

