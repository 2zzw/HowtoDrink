<template>
  <section class="hero-section">
    <div class="hero-content container">
      <div class="hero-text animate__animated animate__fadeInLeft">
        <h1 class="hero-title">发现属于你的<span class="highlight">饮品世界</span></h1>
        <p class="hero-subtitle">从经典到创意，在这里找到最适合你的美味配方</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="exploreDrinks" class="explore-btn">
            开始探索
          </el-button>
          <el-button size="large" @click="viewAllRecipes" class="recipes-btn">
            查看所有配方
          </el-button>
        </div>
      </div>
      <div class="hero-image animate__animated animate__fadeInRight">
        <div class="floating-cards">
          <div
            class="card card-1 animate__animated animate__bounceIn"
            style="animation-delay: 0.2s"
          >
            <div class="card-icon">☕</div>
            <div class="card-label">咖啡</div>
          </div>
          <div
            class="card card-2 animate__animated animate__bounceIn"
            style="animation-delay: 0.4s"
          >
            <div class="card-icon">🧋</div>
            <div class="card-label">奶茶</div>
          </div>
          <div
            class="card card-3 animate__animated animate__bounceIn"
            style="animation-delay: 0.6s"
          >
            <div class="card-icon">🍷</div>
            <div class="card-label">酒品</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const exploreDrinks = () => {
  router.push('/tea')
}

const viewAllRecipes = () => {
  router.push('/tea') // 或者可以跳转到搜索页面
}
</script>

<style scoped lang="scss">
.hero-section {
  background: linear-gradient(135deg, #fff8f0 0%, #ffe8d6 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ffd8a8, #ffa502);
    opacity: 0.1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
    opacity: 0.1;
  }

  .hero-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;

    .hero-text {
      flex: 1;

      .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 20px;
        color: #333;

        .highlight {
          background: linear-gradient(45deg, #ff6b6b, #ffa502);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      .hero-subtitle {
        font-size: 1.3rem;
        color: #666;
        margin-bottom: 40px;
        line-height: 1.6;
      }

      .hero-actions {
        display: flex;
        gap: 20px;

        .explore-btn {
          background: linear-gradient(45deg, #ff6b6b, #ffa502);
          border: none;
          padding: 15px 35px;
          font-size: 1.1rem;
          border-radius: 50px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
          }
        }

        .recipes-btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          border-radius: 50px;
          border: 2px solid #ddd;
          color: #666;
          transition: all 0.3s ease;

          &:hover {
            border-color: #ff6b6b;
            color: #ff6b6b;
            transform: translateY(-3px);
          }
        }
      }
    }

    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;

      .floating-cards {
        position: relative;
        width: 300px;
        height: 300px;

        .card {
          position: absolute;
          width: 120px;
          height: 160px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .card-icon {
            font-size: 3rem;
            margin-bottom: 10px;
          }

          .card-label {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
          }
        }

        .card-1 {
          top: 0;
          left: 50px;
          background: linear-gradient(45deg, #ffd8a8, #fff);
        }

        .card-2 {
          top: 80px;
          right: 30px;
          background: linear-gradient(45deg, #ffecd2, #fff);
        }

        .card-3 {
          bottom: 20px;
          left: 100px;
          background: linear-gradient(45deg, #ffd166, #fff);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;

    .hero-content {
      flex-direction: column;
      text-align: center;

      .hero-text {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
        }

        .hero-actions {
          justify-content: center;
        }
      }

      .hero-image {
        margin-top: 40px;
      }
    }
  }
}
</style>
