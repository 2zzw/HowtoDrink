<template>
  <div class="drink-detail" v-if="currentDrink">
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="getBreadcrumbLink()">
            {{ getCategoryName(currentDrink.type) }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentDrink.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="drink-header animate__animated animate__fadeInDown">
        <div class="drink-image">
          <div class="image-placeholder">{{ currentDrink.name.charAt(0) }}</div>
        </div>
        <div class="drink-info">
          <h1 class="drink-title">{{ currentDrink.name }}</h1>
          <p class="drink-description">{{ currentDrink.description }}</p>
          <div class="drink-meta">
            <span class="meta-item">
              <i class="el-icon-timer"></i>
              制作时间: {{ currentDrink.prepTime }}分钟
            </span>
            <span class="meta-item">
              <i class="el-icon-star-on"></i>
              难度: {{ getDifficultyText(currentDrink.difficulty) }}
            </span>
            <span class="meta-item">
              <i class="el-icon-document"></i>
              配料数: {{ currentDrink.ingredients.length }}种
            </span>
          </div>
        </div>
      </div>

      <div class="recipe-section">
        <div class="ingredients-section animate__animated animate__fadeInLeft">
          <h2 class="section-title">🥢 所需配料</h2>
          <div class="ingredients-list">
            <div
              v-for="(ingredient, index) in currentDrink.ingredients"
              :key="index"
              class="ingredient-item"
              :class="`ingredient-${index % 4}`"
            >
              <div class="ingredient-number">{{ index + 1 }}</div>
              <div class="ingredient-details">
                <div class="ingredient-name">{{ ingredient.name }}</div>
                <div class="ingredient-amount">
                  {{ ingredient.amount }}{{ ingredient.unit || '' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="steps-section animate__animated animate__fadeInRight">
          <h2 class="section-title">📋 制作步骤</h2>
          <div class="steps-list">
            <div v-for="(step, index) in currentDrink.steps" :key="index" class="step-item">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">{{ step }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDrinkStore } from '@/store/drinkStore'
import type { Drink } from '@/types/drink'

const route = useRoute()
const router = useRouter()
const drinkStore = useDrinkStore()

const currentDrink = computed<Drink | undefined>(() => {
  const drinkId = route.params.id as string
  return drinkStore.drinks.find((drink) => drink.id === drinkId)
})

if (!currentDrink.value) {
  router.push('/')
}

const getBreadcrumbLink = () => {
  const typeMap: Record<string, string> = {
    tea: '/tea',
    coffee: '/coffee',
    alcohol: '/alcohol',
  }
  return typeMap[currentDrink.value?.type || ''] || '/'
}

const getCategoryName = (type: string) => {
  const nameMap: Record<string, string> = {
    tea: '奶茶系列',
    coffee: '咖啡系列',
    alcohol: '酒品系列',
  }
  return nameMap[type] || '饮品类'
}

const getDifficultyText = (difficulty: string) => {
  const map: Record<string, string> = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  }
  return map[difficulty] || difficulty
}
</script>

<style scoped lang="scss">
.drink-detail {
  padding: 40px 0;

  .breadcrumb {
    margin-bottom: 30px;
  }

  .drink-header {
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

    .drink-image {
      flex: 0 0 300px;
      height: 300px;
      background: linear-gradient(45deg, #ffd8a8, #ffecd2);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      .image-placeholder {
        font-size: 6rem;
        font-weight: bold;
        color: rgba(255, 107, 107, 0.8);
      }
    }

    .drink-info {
      flex: 1;

      .drink-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #333;
      }

      .drink-description {
        font-size: 1.2rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px;
      }

      .drink-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8f9fa;
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 1rem;
          color: #495057;
        }
      }
    }
  }

  .recipe-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 50px;

    .section-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 30px;
      color: #333;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ingredients-section {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

      .ingredients-list {
        .ingredient-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 16px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateX(10px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .ingredient-number {
            width: 40px;
            height: 40px;
            background: linear-gradient(45deg, #ff6b6b, #ffa502);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          .ingredient-details {
            flex: 1;

            .ingredient-name {
              font-size: 1.2rem;
              font-weight: 500;
              margin-bottom: 5px;
              color: #333;
            }

            .ingredient-amount {
              font-size: 1rem;
              color: #666;
            }
          }

          &.ingredient-0 {
            background: linear-gradient(45deg, #ffd8a8, #fff);
          }

          &.ingredient-1 {
            background: linear-gradient(45deg, #ffecd2, #fff);
          }

          &.ingredient-2 {
            background: linear-gradient(45deg, #d4edda, #fff);
          }

          &.ingredient-3 {
            background: linear-gradient(45deg, #cce5ff, #fff);
          }
        }
      }
    }

    .steps-section {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

      .steps-list {
        .step-item {
          display: flex;
          gap: 20px;
          padding: 25px;
          margin-bottom: 20px;
          border-radius: 16px;
          background: linear-gradient(45deg, #f8f9fa, #fff);
          border-left: 4px solid #ff6b6b;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .step-number {
            width: 50px;
            height: 50px;
            background: #ff6b6b;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.3rem;
            flex-shrink: 0;
          }

          .step-content {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #333;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .drink-detail {
    .drink-header {
      flex-direction: column;

      .drink-image {
        width: 100%;
        flex: none;
      }
    }

    .recipe-section {
      grid-template-columns: 1fr;

      .ingredients-section,
      .steps-section {
        padding: 25px;
      }
    }
  }
}
</style>
