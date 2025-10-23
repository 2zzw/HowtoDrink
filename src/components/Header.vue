<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">
        <span class="logo-icon">🍻</span>
        <span class="logo-text">喝了么</span>
      </router-link>

      <nav class="nav">
        <router-link to="/" class="nav-item" active-class="active">首页</router-link>
        <router-link to="/tea" class="nav-item" active-class="active">奶茶</router-link>
        <router-link to="/coffee" class="nav-item" active-class="active">咖啡</router-link>
        <router-link to="/alcohol" class="nav-item" active-class="active">酒品</router-link>
      </nav>

      <div class="search-container">
        <el-input
          v-model="searchQuery"
          placeholder="搜索饮品或配料..."
          class="search-input"
          :prefix-icon="Search"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDrinkStore } from '@/store/drinkStore'
import { Search } from '@element-plus/icons-vue'



const drinkStore = useDrinkStore()
const searchQuery = ref(drinkStore.searchQuery)

const handleSearch = () => {
  drinkStore.setSearchQuery(searchQuery.value)
}

watch(
  () => drinkStore.searchQuery,
  (newVal) => {
    searchQuery.value = newVal
  },
)
</script>

<style scoped lang="scss">
.header {
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;

    .logo-icon {
      font-size: 1.8rem;
      margin-right: 8px;
      animation: clink 2s infinite;
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, #ff6b6b, #ffa502);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .nav {
    display: flex;
    gap: 30px;

    .nav-item {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 20px;
      transition: all 0.3s ease;

      &:hover {
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
      }

      &.active {
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
      }
    }
  }

  .search-container {
    width: 250px;

    .search-input {
      :deep(.el-input__wrapper) {
        border-radius: 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

        &:hover {
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

@keyframes clink {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

@media (max-width: 768px) {
  .header {
    .container {
      flex-direction: column;
      gap: 15px;
    }

    .logo {
      .logo-icon {
        font-size: 1.5rem;
      }

      .logo-text {
        font-size: 1.5rem;
      }
    }

    .nav {
      gap: 15px;

      .nav-item {
        padding: 6px 10px;
        font-size: 0.9rem;
      }
    }

    .search-container {
      width: 100%;
      max-width: 300px;
    }
  }
}
</style>
