<template>
  <div class="login-container">
    <div class="panel">
      <div class="title-container">
        <p class="title">WELCOME</p>
      </div>

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >

        <el-form-item prop="loginId">
          <el-input
            ref="loginId"
            v-model="loginForm.loginId"
            placeholder="请输入用户名称"
            name="loginId"
            type="text"
            autocomplete="off"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入登录密码"
            name="password"
            clearable
            autocomplete="off"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>



    <!-- 修改密码 -->
    <VEditPassword :visible.sync="editPassDialogVisible" @sure="editPassSure" />

    <p class="icp">
      <a href="https://beian.miit.gov.cn/#/Integrated/index">渝ICP备XXXXXXXXXXX</a>
    </p>
  </div>
</template>

<script>
import MD5 from 'md5';
import { setToken } from '@lanshu/system-common/utils/token';

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入登录密码！'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        loginId: '',
        password: '',
      },
      loginRules: {
        loginId: [
          { required: true, trigger: 'change', message: '请输入用户名称！' },
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword },
        ],
      },
      loading: false,
      editPassDialogVisible: false,
      userId: '',
    };
  },
  watch: {
    editPassDialogVisible() {
      this.$refs.form && this.$refs.form.resetFields();
    },
  },
  mounted() {
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        const { loginId, password } = this.loginForm;
        const pwd = MD5(password).toUpperCase().substr(0, 32);
        this.$https
          .post('/login/in', {
            loginId,
            pwd,
          })
          .then(({ data }) => {
            if (data.firstTime === 1) {
              this.userId = data.userId;
              this.editPassDialogVisible = true;
              this.loading = false;
              return;
            }
            setToken(data);
            this.$store.commit('user/updateUserInfo', data);
            this.$store.commit('user/updateAuthBtn', data.resources);
            this.loading = false;
            this.$router.push('/');
          })
          .catch((error) => {
            this.loading = false;
          });
        return true;
      });
    },
    editPassSure(form) {
      const { oldPassword, newPassword } = form;
      this.$https
        .post('/user/pwd/change', {
          oldPwd: oldPassword,
          newPwd: newPassword,
          userId: this.userId,
        })
        .then(() => {
          this.$message.success('密码修改成功，请重新登录！');
          this.loginForm.password = '';
        });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.login-container {
  min-height: 600px;
  height: 100%;
  width: 100%;
  background-color: #333;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .panel {
    transform: translateY(-100px);
    .title-container {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
      text-align: center;

      .title {
        font-size: 45px;
        margin: 20px 0;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;

      /deep/ .el-form-item {
        margin-bottom: 32px;

        .el-form-item__error {
          margin-top: 2px;
        }

        .el-input__inner {
          width: 260px;
          height: 42px;
          line-height: 42px;
          background: transparent;
          text-align: left;
          border-radius: 6px;
          color: #fff;
          font-size: 14px;
        }

        .el-input__clear {
          font-size: 16px;
          transform: translateY(2px);
        }
      }

      button {
        width: 260px;
        height: 40px;
        line-height: 0;
        border-radius: 6px;
        font-size: 14px;
      }
    }
  }

  .icp {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 24px;
    text-align: center;
    a {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
