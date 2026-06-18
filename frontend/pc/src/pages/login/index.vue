<template>
  <main class="grid min-h-screen items-start justify-items-center bg-[#f4f6f8] px-5 pt-24 text-[#303133] sm:items-center sm:py-8">
    <header class="fixed top-5 left-5 inline-flex items-center gap-2.5 text-lg font-bold text-gray-800 sm:top-6 sm:left-7">
      <div class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-base text-white">A</div>
      <span>Agent</span>
    </header>

    <section class="w-full max-w-[388px] rounded-lg border border-gray-200 bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]" aria-labelledby="login-title">
      <div class="mb-7">
        <h1 id="login-title" class="m-0 text-[26px] leading-tight font-bold text-gray-900">登录</h1>
        <p class="mt-2 mb-0 text-sm text-gray-500">欢迎回来，请登录你的账号</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" size="large" label-position="top" @keyup.enter="handleSubmit">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入账号" autocomplete="username" prefix-icon="User" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="form.password" type="password" placeholder="请输入密码" autocomplete="current-password" prefix-icon="Lock" show-password />
        </el-form-item>

        <div class="mt-0.5 mb-5 flex items-center justify-between">
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
          <el-button type="primary" link>忘记密码</el-button>
        </div>

        <el-button class="w-full" type="primary" :loading="submitting" @click="handleSubmit"> 登录 </el-button>
      </el-form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { login } from "@/shared/api/auth";

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const router = useRouter();
const formRef = ref<FormInstance>();
const submitting = ref(false);

const form = reactive<LoginForm>({
  username: "",
  password: "",
  remember: false,
});

const rules: FormRules<LoginForm> = {
  username: [{ required: true, message: "请输入邮箱", trigger: "blur", type: "email" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const handleSubmit = async () => {
  if (!formRef.value || submitting.value) return;

  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  submitting.value = true;
  try {
    const user = await login({ email: form.username, password: form.password });
    await router.push("/main/chat");
  } catch (error) {
    submitting.value = false;
  }
  submitting.value = false;
};
</script>
