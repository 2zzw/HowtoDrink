<template>
  <div class="home">
    <HeroSection />

    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门推荐</h2>
          <p class="section-subtitle">最受欢迎的饮品配方</p>
        </div>

        <div class="drinks-grid">
          <DrinkCard
            v-for="drink in featuredDrinks"
            :key="drink.id"
            :drink="drink"
            class="animate__animated animate__fadeInUp"
            :style="{ animationDelay: `${getIndex(drink.id) * 0.1}s` }"
          />
        </div>

        <div class="browse-all">
          <el-button type="primary" size="large" @click="browseCategories" class="browse-btn">
            浏览所有分类
          </el-button>
        </div>
      </div>
    </section>

    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">饮品分类</h2>
          <p class="section-subtitle">按照你的喜好探索不同的饮品世界</p>
        </div>

        <div class="categories-grid">
          <div
            v-for="category in categories"
            :key="category.type"
            class="category-card animate__animated animate__fadeInUp"
            @click="goToCategory(category.type)"
            :style="{ animationDelay: `${categories.indexOf(category) * 0.1}s` }"
          >
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-count">{{ category.count }}种配方</p>
            <div class="category-bg" :style="{ background: category.gradient }"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDrinkStore } from '@/store/drinkStore'
import HeroSection from '@/components/HeroSection.vue'
import DrinkCard from '@/components/DrinkCard.vue'

const router = useRouter()
const drinkStore = useDrinkStore()

// 初始化饮品数据
drinkStore.initDrinks()

const featuredDrinks = computed(() => {
  // 取前6个饮品作为推荐
  return drinkStore.drinks.slice(0, 6)
})

const getIndex = (id: string) => {
  return drinkStore.drinks.findIndex((d) => d.id === id)
}

const categories = computed(() => [
  {
    type: 'tea',
    name: '奶茶系列',
    icon: '🧋',
    count: drinkStore.drinksByType('tea').length,
    gradient: 'linear-gradient(45deg, #ffd8a8, #ffa502)',
  },
  {
    type: 'coffee',
    name: '咖啡系列',
    icon: '☕',
    count: drinkStore.drinksByType('coffee').length,
    gradient: 'linear-gradient(45deg, #d4a574, #8b4513)',
  },
  {
    type: 'alcohol',
    name: '酒品系列',
    icon: '🍷',
    count: drinkStore.drinksByType('alcohol').length,
    gradient: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
  },
])

const browseCategories = () => {
  router.push('/tea')
}

const goToCategory = (type: string) => {
  router.push(`/${type}`)
}
</script>

<style scoped lang="scss">
.featured-section {
  padding: 100px 0;
  background: white;

  .section-header {
    text-align: center;
    margin-bottom: 50px;

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      color: #333;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
    }
  }

  .drinks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
  }

  .browse-all {
    text-align: center;

    .browse-btn {
      background: linear-gradient(45deg, #ff6b6b, #ffa502);
      border: none;
      padding: 15px 40px;
      font-size: 1.1rem;
      border-radius: 50px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
      }
    }
  }
}

.categories-section {
  padding: 100px 0;
  background: #fafafa;

  .section-header {
    text-align: center;
    margin-bottom: 50px;

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      color: #333;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
    }
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;

    .category-card {
      background: white;
      border-radius: 20px;
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }

      .category-icon {
        font-size: 4rem;
        margin-bottom: 20px;
      }

      .category-name {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
      }

      .category-count {
        font-size: 1rem;
        color: #666;
      }

      .category-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        z-index: -1;
      }
    }
  }
}

@media (max-width: 768px) {
  .featured-section,
  .categories-section {
    padding: 60px 0;

    .section-header .section-title {
      font-size: 2rem;
    }

    .section-header .section-subtitle {
      font-size: 1rem;
    }
  }
}
</style>
