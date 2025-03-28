<template>
  <div>
    <h2>貸出管理</h2>

    <input
      type="text"
      v-model="searchUserId"
      @keydown.enter="fetchLoans"
      placeholder="ユーザーIDで検索"
    />

    <div v-if="loading">読み込み中...</div>

    <!-- loansが1件以上ある時だけ表示 -->
    <table v-if="!loading && loans.length > 0" class="loan-table">
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
          <td>{{ item.貸出ID }}</td>
          <td>{{ item.利用者ID }}</td>
          <td>{{ item.利用者名 }}</td>
          <td>{{ item.書籍ID }}</td>
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
import { ref } from 'vue'

const loans = ref<any[]>([])
const loading = ref(false)
const searchUserId = ref('')

const API_BASE_URL = 'https://x002gqvha4.execute-api.ap-northeast-1.amazonaws.com/dev/loans'

const formatDate = (value: string | null) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString()
}

const fetchLoans = async () => {
  if (!searchUserId.value) return
  loading.value = true
  try {
    const url = `${API_BASE_URL}?userId=${encodeURIComponent(searchUserId.value)}`
    const res = await fetch(url)
    const data = await res.json()
    console.log("📦 フィルタ済みデータ:", data)
    loans.value = data
  } catch (err) {
    console.error('API呼び出しエラー:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
input {
  margin-bottom: 1rem;
  padding: 0.5rem;
}
</style>
