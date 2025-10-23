<template>
  <div class="drinks-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">🥛 奶茶系列</h1>
        <p class="page-subtitle">从经典珍珠奶茶到创意芋泥波霸，发现你的最爱</p>
      </div>
    </div>

    <div class="container">
      <div class="filters-section">
        <div class="filter-controls">
          <el-select
            v-model="difficultyFilter"
            placeholder="难度筛选"
            clearable
            class="filter-select"
          >
            <el-option label="全部难度" value=""></el-option>
            <el-option label="简单" value="easy"></el-option>
            <el-option label="中等" value="medium"></el-option>
            <el-option label="困难" value="hard"></el-option>
          </el-select>

          <el-select v-model="timeFilter" placeholder="时间筛选" clearable class="filter-select">
            <el-option label="全部时间" value=""></el-option>
            <el-option label="快速制作 (<5分钟)" value="quick"></el-option>
            <el-option label="标准制作 (5-10分钟)" value="standard"></el-option>
            <el-option label="精致制作 (>10分钟)" value="premium"></el-option>
          </el-select>
        </div>

        <div class="results-info">找到 {{ filteredTeaDrinks.length }} 种奶茶配方</div>
      </div>

      <div class="drinks-grid">
        <DrinkCard
          v-for="drink in filteredTeaDrinks"
          :key="drink.id"
          :drink="drink"
          class="animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${filteredTeaDrinks.indexOf(drink) * 0.1}s` }"
        />
      </div>

      <div v-if="filteredTeaDrinks.length === 0" class="no-results">
        <div class="no-results-icon">🍵</div>
        <h3>没有找到相关奶茶配方</h3>
        <p>尝试调整搜索条件或查看其他分类</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDrinkStore } from '@/store/drinkStore'
import DrinkCard from '@/components/DrinkCard.vue'

const drinkStore = useDrinkStore()
const difficultyFilter = ref('')
const timeFilter = ref('')

const teaDrinks = computed(() => drinkStore.drinksByType('tea'))

const filteredTeaDrinks = computed(() => {
  let result = [...teaDrinks.value]

  // 难度筛选
  if (difficultyFilter.value) {
    result = result.filter((drink) => drink.difficulty === difficultyFilter.value)
  }

  // 时间筛选
  if (timeFilter.value) {
    switch (timeFilter.value) {
      case 'quick':
        result = result.filter((drink) => drink.prepTime < 5)
        break
      case 'standard':
        result = result.filter((drink) => drink.prepTime >= 5 && drink.prepTime <= 10)
        break
      case 'premium':
        result = result.filter((drink) => drink.prepTime > 10)
        break
    }
  }

  // 搜索筛选
  if (drinkStore.searchQuery) {
    const query = drinkStore.searchQuery.toLowerCase()
    result = result.filter(
      (drink) =>
        drink.name.toLowerCase().includes(query) ||
        drink.description.toLowerCase().includes(query) ||
        drink.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(query)),
    )
  }

  return result
})

// 清除搜索时重置筛选器
watch(
  () => drinkStore.searchQuery,
  (newVal) => {
    if (!newVal) {
      difficultyFilter.value = ''
      timeFilter.value = ''
    }
  },
)
</script>

<style scoped lang="scss">
.drinks-page {
  padding: 40px 0;

  .page-header {
    background: linear-gradient(135deg, #ffd8a8 0%, #ffa502 100%);
    padding: 60px 0;
    margin-bottom: 40px;
    color: white;

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .page-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }

  .filters-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;

    .filter-controls {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;

      .filter-select {
        width: 180px;
      }
    }

    .results-info {
      font-size: 1.1rem;
      color: #666;
      font-weight: 500;
    }
  }

  .drinks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .no-results {
    text-align: center;
    padding: 80px 0;

    .no-results-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #333;
    }

    p {
      color: #666;
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 768px) {
  .drinks-page {
    .page-header {
      padding: 40px 0;

      .page-title {
        font-size: 2rem;
      }

      .page-subtitle {
        font-size: 1rem;
      }
    }

    .filters-section {
      flex-direction: column;
      align-items: stretch;

      .filter-controls {
        .filter-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
