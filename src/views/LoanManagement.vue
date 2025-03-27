<template>
  <div>
    <h2>貸出管理</h2>

<div v-if="loading">読み込み中...</div>
    <table v-else class="loan-table">
      <thead>
        <tr>
          <th>貸出ID</th>
          <th>利用者ID</th>
          <th>利用者名</th>
          <th>書籍ID</th>
          <th>書籍タイトル</th>
          <th>貸出日</th>
          <th>返却期限</th>
          <th>返却済み</th>
          <th>返却日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in loans" :key="item.貸出ID">
  <td>{{ item.貸出id }}</td>
  <td>{{ item.利用者id }}</td>
  <td>{{ item.利用者名 }}</td>
  <td>{{ item.書籍id }}</td>
  <td>{{ item.書籍タイトル }}</td>
  <td>{{ formatDate(item.貸出日) }}</td>
  <td>{{ formatDate(item.返却期限) }}</td>
  <td>{{ item.返却済み }}</td>
  <td>{{ formatDate(item.返却日) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loans = ref<any[]>([])
const loading = ref(true)

const API_URL = 'https://x002gqvha4.execute-api.ap-northeast-1.amazonaws.com/dev/loans' // ← Lambda側を貸出管理にしたらパスも変えるならここ変更

const formatDate = (value: string | null) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString()
}

onMounted(async () => {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    console.log("📦 APIから取得した貸出履歴:", data)
    loans.value = data
  } catch (err) {
    console.error('API呼び出しエラー:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
</style>
