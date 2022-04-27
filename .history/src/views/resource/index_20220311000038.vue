<template>
  <div class="resource">
    <resource-list></resource-list>
  </div>
</template>

<script>
import ResourceList from './components/List'
require('@/utils/temp')
export default {
  name: 'ResourceIndex',
  components: {
    ResourceList
  }
}
</script>

<style lang="scss" scoped></style>
