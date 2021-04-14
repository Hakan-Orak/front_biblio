<template>
	<div>
		<input type="text" placeholder="Rechercher une image" />
		<div class="imgList">
			<div v-for="img in tempImgList" :key="img.id" class="imgBlock">
				<img :src="img.link" class="imgPreview" />
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
	data() {
		return {
			tempImgList: [
				{ id: 1, link: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 2, link: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80' },
				{ id: 3, link: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 4, link: 'https://images.unsplash.com/photo-1587783778110-2e4c56c5767e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
				{ id: 5, link: 'https://images.unsplash.com/photo-1560807310-21f376a29d33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
				{ id: 18, link: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 6, link: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80' },
				{ id: 7, link: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 8, link: 'https://images.unsplash.com/photo-1587783778110-2e4c56c5767e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
				{ id: 9, link: 'https://images.unsplash.com/photo-1560807310-21f376a29d33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
				{ id: 19, link: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 10, link: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80' },
				{ id: 11, link: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 12, link: 'https://images.unsplash.com/photo-1587783778110-2e4c56c5767e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
				{ id: 13, link: 'https://images.unsplash.com/photo-1560807310-21f376a29d33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
				{ id: 20, link: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 14, link: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80' },
				{ id: 15, link: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
				{ id: 16, link: 'https://images.unsplash.com/photo-1587783778110-2e4c56c5767e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
				{ id: 17, link: 'https://images.unsplash.com/photo-1560807310-21f376a29d33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
			]
		};
	},
	components: {
		HelloWorld
	}
};
</script>

<style scoped>
.imgList {
	display: flex;
	flex-wrap: wrap;
}
.imgBlock {
	padding: 0.5rem;
	margin: 1rem;
	box-shadow: 0px 5px 10px rgb(221, 221, 221);
}
.imgPreview {
	max-width: 20vw;
	max-height: 20vh;
}

input {
	border: 0px;
	box-shadow: inset 0px 2px 10px rgb(221, 221, 221), inset 0px -2px 10px rgb(221, 221, 221);
  width: 50%;
  height:2rem;
  padding: 0.5rem;
}
</style>
