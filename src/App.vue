<script setup lang="ts">
import { ref } from 'vue'
import LoanManagement from './views/LoanManagement.vue'
import BookRegister from './views/BookRegister.vue'
import UserRegister from './views/UserRegister.vue'

// タブの状態を管理
const currentTab = ref('loan')
</script>

<template>
  <div>
    <h1>📘 書籍貸出システム</h1>

    <!-- タブボタン -->
    <div style="margin-bottom: 1rem;">
      <button @click="currentTab = 'loan'">📖 書籍貸出管理</button>
      <button @click="currentTab = 'book'">📚 書籍登録</button>
      <button @click="currentTab = 'user'">👤 ユーザー登録</button>
    </div>

    <!-- タブの中身 -->
    <div v-if="currentTab === 'loan'">
      <LoanManagement />
    </div>
    <div v-else-if="currentTab === 'book'">
      <BookRegister />
    </div>
    <div v-else-if="currentTab === 'user'">
      <UserRegister />
    </div>
  </div>
</template>

<style scoped>
button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
