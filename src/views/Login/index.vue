<template>
  <div class="login-page">
    <!-- 背景装饰层 -->
    <div class="bg-decoration">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
    </div>

    <!-- 主内容区 -->
    <div class="login-container">
      <div class="login-card">
        <!-- 登录表单 -->
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
          label-width="0px"
          class="login-form"
        >
          <div class="login-header">
            <h2 class="login-title">欢迎回来</h2>
            <p class="login-subtitle">请输入您的账号信息</p>
          </div>

          <div class="form-item-group">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
                prefix-icon="el-icon-user"
                :class="{ 'input-focus': isUsernameFocused }"
                @focus="isUsernameFocused = true"
                @blur="isUsernameFocused = false"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                show-password
                :class="{ 'input-focus': isPasswordFocused }"
                @focus="isPasswordFocused = true"
                @blur="isPasswordFocused = false"
              />
            </el-form-item>
          </div>

          <div class="form-actions">
            <el-button
              type="primary"
              @click="handleLogin"
              class="login-btn"
              :loading="isLoading"
            >
              <span v-if="!isLoading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </div>

          <!-- <div class="form-footer">
            <router-link to="/forgot-password" class="forgot-password"
              >忘记密码?</router-link
            >
            <router-link to="/register" class="register-link"
              >注册账号</router-link
            >
          </div> -->
        </el-form>
      </div>

      <!-- 品牌信息 -->
      <div class="brand-info">
        <h1 class="brand-name">
          System<span class="brand-highlight">Admin</span>
        </h1>
        <p class="brand-desc">高效、现代的后台管理解决方案</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/api/interfaces/login';

// 路由实例
const router = useRouter();
if (localStorage.getItem('token')) {
  router.push('/');
}

// 表单引用
const loginFormRef = ref(null);

// 状态变量
const isLoading = ref(false);
const isUsernameFocused = ref(false);
const isPasswordFocused = ref(false);

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
});

// 表单校验规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度至少为6位', trigger: 'blur' },
    { max: 12, message: '用户名长度至多为16位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' },
    { max: 16, message: '密码长度至多为16位', trigger: 'blur' },
  ],
};

// 处理登录逻辑
const handleLogin = async () => {
  // 表单校验
  const valid = await loginFormRef.value.validate();

  if (valid) {
    try {
      isLoading.value = true;

      // 模拟API请求延迟
      const res = await login(loginForm.value);
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (error) {
      ElMessage.error('登录失败，请检查账号密码');
      console.error('登录错误:', error);
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
// 基础布局
.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f7fa;
}

// 背景装饰
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .bg-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4a6fe3 0%, #6b4cf5 100%);
    opacity: 0.9;
  }

  .bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L50 60 L60 60 L60 50 Z" fill="white" fill-opacity="0.05"/></svg>');
    background-size: 50px;
  }
}

// 登录容器
.login-container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10%;
  z-index: 1;

  @media (max-width: 992px) {
    justify-content: center;
    padding: 0 5%;
  }
}

// 品牌信息
.brand-info {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;

  .brand-name {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;

    .brand-highlight {
      color: #ffd166;
    }
  }

  .brand-desc {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 300px;
  }

  @media (max-width: 992px) {
    display: none;
  }
}

// 登录卡片
.login-card {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
}

// 登录表单
.login-form {
  padding: 2.5rem;
}

// 表单头部
.login-header {
  text-align: center;
  margin-bottom: 2rem;

  .login-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1d2129;
    margin-bottom: 0.5rem;
  }

  .login-subtitle {
    font-size: 1rem;
    color: #86909c;
  }
}

// 表单项组
.form-item-group {
  margin-bottom: 1.5rem;
}

// 输入框样式
.el-input {
  --el-input-focus-border-color: #6b4cf5;
  --el-input-hover-border-color: #c9b8ff;

  height: 50px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  transition: all 0.3s ease;

  &.input-focus {
    border-color: #6b4cf5;
    box-shadow: 0 0 0 3px rgba(107, 76, 245, 0.1);
  }

  .el-input__inner {
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    border-radius: 8px;
  }

  .el-input__prefix {
    left: 15px;

    .el-icon {
      color: #86909c;
      font-size: 1.1rem;
    }
  }
}

// 表单操作区
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

// 登录按钮
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background-color: #6b4cf5;
  border-color: #6b4cf5;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5a3ed9;
    border-color: #5a3ed9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

// 表单页脚
.form-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;

  a {
    color: #86909c;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #6b4cf5;
      text-decoration: underline;
    }
  }
}
</style>
