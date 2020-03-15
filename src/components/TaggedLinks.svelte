<script>
    import {onMount} from 'svelte';

    let posts = [];

    onMount(async function () {
        posts = await (await fetch('http://api.localhost/wp-json/wp/v2/posts')).json();
        console.log(posts);
    });
</script>

<ul>
    {#each posts as post}
        <li>{post.title.rendered}</li>
    {/each}
</ul>

