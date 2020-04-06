<script>
	import Nav from '../components/Nav.svelte';
	import Widget from '../components/Widget.svelte';
	import PostLinksAccordion from '../components/PostLinksAccordion.svelte';
	import News from '../components/News.svelte';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';

	export let segment;
</script>

<style lang="scss">
	main {
		overflow:auto;
		background: url('/bg.jpg') top center no-repeat #dfdfdf;
		background-size: 100% auto;
	}
</style>

<main>
	<Header></Header>
	<Nav {segment}></Nav>
	<div class="content">
		<div class="sidebar">
			<Widget>
				<h3>Меню сайта</h3>
				<PostLinksAccordion></PostLinksAccordion>
			</Widget>
			<Widget>
				<h3>Новости</h3>
				<News></News>
			</Widget>
		</div>
		<slot></slot>
	</div>
	<Footer></Footer>
</main>
