<template>
  <div id="app">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h2>喝了么</h2>
            <p>发现每一杯的美好</p>
          </div>
          <div class="footer-links">
            <div class="link-column">
              <h4>饮品分类</h4>
              <router-link to="/tea">奶茶</router-link>
              <router-link to="/coffee">咖啡</router-link>
              <router-link to="/alcohol">酒品</router-link>
            </div>
            <div class="link-column">
              <h4>关于我们</h4>
              <a href="#">联系我们</a>
              <a href="#">使用说明</a>
              <a href="#">隐私政策</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 喝了么. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-footer {
  background: #333;
  color: white;
  padding: 60px 0 30px;
  margin-top: 100px;

  .footer-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    .footer-logo {
      h2 {
        font-size: 2rem;
        margin-bottom: 10px;
        background: linear-gradient(45deg, #ff6b6b, #ffa502);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        color: #ccc;
        font-size: 1.1rem;
      }
    }

    .footer-links {
      display: flex;
      gap: 60px;

      .link-column {
        h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #fff;
        }

        a {
          display: block;
          color: #ccc;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.3s ease;

          &:hover {
            color: #ff6b6b;
          }
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid #555;

    p {
      color: #999;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 768px) {
  .main-footer {
    .footer-content {
      flex-direction: column;
      gap: 40px;

      .footer-links {
        flex-direction: column;
        gap: 30px;
      }
    }
  }
}
</style>
