<template>
  <div class="common-layout">
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="layout-header">
        <div class="header-left">
          <!-- 侧边栏折叠按钮 -->
          <el-button
            :icon="isCollapse ? 'Expand' : 'Fold'"
            text
            @click="toggleCollapse"
            class="collapse-btn"
          />
          <span class="app-title">Agent</span>
        </div>
        <div class="header-right">
          <!-- 预留：用户头像/设置等 -->
        </div>
      </el-header>

      <el-container class="layout-body">
        <!-- 侧边栏菜单 -->
        <el-aside :width="asideWidth" class="layout-aside">
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            class="layout-menu"
          >
            <el-menu-item
              v-for="menu in menuList"
              :key="menu.name"
              :index="menu.url"
            >
              <el-icon v-if="menu.icon">
                <component :is="menu.icon" />
              </el-icon>
              <template #title>
                <span>{{ menu.name }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主内容区 -->
        <el-main class="layout-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// ============ 类型定义 ============
/** 菜单项 */
interface MenuItem {
  /** 路由路径 */
  url: string
  /** 显示名称 */
  name: string
  /** Element Plus 图标组件名（可选） */
  icon?: string
}

// ============ 菜单配置 ============
/** 菜单列表 —— 后续可从配置中心读取 */
const menuList: MenuItem[] = [
  {
    url: '/chat',
    name: 'Chat',
    icon: 'ChatDotSquare',
  },
]

// ============ 侧边栏折叠逻辑 ============
const isCollapse = ref(false)

/** 切换侧边栏折叠状态 */
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

/** 侧边栏宽度（折叠/展开） */
const asideWidth = computed(() => (isCollapse.value ? '64px' : '200px'))

// ============ 菜单活跃状态 ============
const route = useRoute()

/** 当前路由路径，用于高亮菜单项 */
const activeMenu = computed(() => route.path)
</script>

<style scoped lang="less">
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

// ========== 顶部导航栏 ==========
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  z-index: 10;

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .app-title {
    font-size: 18px;
    font-weight: 700;
    color: #303133;
    user-select: none;
  }

  .collapse-btn {
    font-size: 18px;
  }
}

// ========== 主体区域 ==========
.layout-body {
  flex: 1;
  overflow: hidden;
}

// ========== 侧边栏 ==========
.layout-aside {
  background: #fff;
  border-right: 1px solid #e4e7ed;
  transition: width 0.2s ease;
  overflow: hidden;
}

// ========== 菜单 ==========
.layout-menu {
  border-right: none;
}

// ========== 主内容 ==========
.layout-main {
  background: #f5f7fa;
  overflow-y: auto;
}
</style>
