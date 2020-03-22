<script>
    import { onMount } from 'svelte';
    import { apiUrlV2 } from 'constants';

    let state = {
        posts: [],
        currentPage: 1,
        pages: []
    };

    const createPages = (length) => Array.apply(null, {length}).map((_, i) => ++i);

    onMount(async function () {
        await onChangePage();
    });

    async function onChangePage(page = 1) {
        state = {
            ...state,
            ...await getPosts(page)
        };
    }

    async function getPosts(currentPage, perPage = 5) {
        const response = await fetch(`${apiUrlV2}/posts?per_page=${perPage}&page=${currentPage}`);

        return {
            posts: await response.json(),
            pages: createPages(response.headers.get('X-WP-TotalPages')),
            currentPage
        };
    }
</script>

<style lang="scss">
    .pagination {
        display: flex;

        li {
            list-style: none;
        }

        button {
            background: none;
            border: 1px #555555 solid;
            margin: 7px;
            cursor: pointer;
            
            &.active {
                background: #9c7c00;
            }
        }
    }
</style>

<ul>
    {#each state.posts as post}
        <li>
            <a href="/articles/{post.slug}" rel="prefetch">{post.title.rendered}</a>
        </li>
    {/each}
</ul>

<ul class="pagination">
    {#each state.pages as page}
        <li>
            <button class="{ page === state.currentPage ? 'active' : '' }" on:click="{() => onChangePage(page)}">
                {page}
            </button>
        </li>
    {/each}
</ul>

