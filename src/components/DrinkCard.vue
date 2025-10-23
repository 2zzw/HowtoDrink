<template>
  <div class="drink-card animate__animated animate__fadeInUp" @click="goToDetail">
    <div class="card-image">
      <div class="image-placeholder">{{ drink.name.charAt(0) }}</div>
    </div>
    <div class="card-content">
      <h3 class="drink-name">{{ drink.name }}</h3>
      <p class="drink-description">{{ drink.description }}</p>
      <div class="drink-meta">
        <span class="difficulty" :class="drink.difficulty">{{
          getDifficultyText(drink.difficulty)
        }}</span>
        <span class="time">⏱️ {{ drink.prepTime }}分钟</span>
      </div>
      <div class="ingredients-preview">
        <span
          v-for="(ingredient, index) in drink.ingredients.slice(0, 3)"
          :key="index"
          class="ingredient-tag"
        >
          {{ ingredient.name }}
        </span>
        <span v-if="drink.ingredients.length > 3" class="more-tag">
          +{{ drink.ingredients.length - 3 }}种
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Drink } from '@/types/drink'

interface Props {
  drink: Drink
}

const props = defineProps<Props>()
const router = useRouter()

const goToDetail = () => {
  router.push(`/drink/${props.drink.id}`)
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
.drink-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }

  .card-image {
    height: 200px;
    background: linear-gradient(45deg, #ffd8a8, #ffecd2);
    display: flex;
    align-items: center;
    justify-content: center;

    .image-placeholder {
      font-size: 4rem;
      font-weight: bold;
      color: rgba(255, 107, 107, 0.8);
    }
  }

  .card-content {
    padding: 20px;

    .drink-name {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }

    .drink-description {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .drink-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .difficulty {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;

        &.easy {
          background: #d4edda;
          color: #155724;
        }

        &.medium {
          background: #fff3cd;
          color: #856404;
        }

        &.hard {
          background: #f8d7da;
          color: #721c24;
        }
      }

      .time {
        font-size: 0.9rem;
        color: #666;
      }
    }

    .ingredients-preview {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .ingredient-tag {
        background: #f8f9fa;
        color: #495057;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.8rem;
      }

      .more-tag {
        background: #e9ecef;
        color: #6c757d;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
