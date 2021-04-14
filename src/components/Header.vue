<template>
	<div id="header">
		<h2>Nom de l'appli</h2>
		<div id="nav">
			<router-link to="/">Images</router-link> |
			<router-link to="/about">About</router-link>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
#header {
	height: 10vh;
	min-height: 100px;
	width: 100%;
	box-shadow: 0px 5px 10px rgb(221, 221, 221);
	display: flex;
	justify-content: space-evenly;
	align-items: baseline;
	margin-bottom: 2rem;
}
#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
	text-decoration: none;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
