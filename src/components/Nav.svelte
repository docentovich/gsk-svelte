<script>
	export let segment;
</script>

<style lang="scss">
	nav {
		display: block;
		background: #cccccc;
	}
</style>

<nav>
	<div class="container">
		<ul>
			<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
			<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>
			<li><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li>
		</ul>
	</div>
</nav>
