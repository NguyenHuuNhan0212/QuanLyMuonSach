<template>
<div class="card text-center" style="width: 18rem;">
  <img :src="book.image" class="card-img-top" width="150px" height="200px" :alt="book.title">
  <div class="card-body">
    <h5 class="card-title"> {{ book.title }}</h5>
    <p class="card-text">{{ book.description }}</p>
    <a href="#" class="btn btn-primary">Xem chi tiết</a>
  </div>
</div>
</template>
<script>
export default {
    name: 'Sach',
    data() {
        return {
        };
    },
    props: {
        book: {
            type: Object,
            required: true
        }
    },
};
</script>