import { useMemo, useState } from "react";
import styled from "styled-components";
import { Modal, Form, Input, Button, message } from "antd";
import { LoginCredits, RegistrationCredits } from "../../model/authStore";
import { useAuthStore } from "../../../../providers/AuthProvider";

const StyledButton = styled(Button)``;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AuthMenu = () => {
  const [loginVisible, setLoginVisible] = useState(false);

  const [registerVisible, setRegisterVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const authStore = useAuthStore();

  const showLogin = () => setLoginVisible(true);

  const showRegister = () => setRegisterVisible(true);

  const handleLogin = async (values: LoginCredits) => {
    try {
      setLoading(true);
      const response = await authStore.login(values);
      message.success("Вход выполнен!");
      console.log(response);
      setLoginVisible(false);
    } catch (err: any) {
      message.error(err?.response?.data?.error || "Ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (values: RegistrationCredits) => {
    try {
      setLoading(true);
      const response = await authStore.registration(values);
      message.success("Регистрация прошла успешно!");
      console.log(response);
      setRegisterVisible(false);
    } catch (err: any) {
      message.error(err?.response?.data?.errorMessage || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    authStore.logout();
  };

  const authMenuPopup = useMemo(() => {
    if (authStore.authorizationUser) {
      return (
        <StyledButton type="primary" onClick={logoutHandler}>
          Выйти
        </StyledButton>
      );
    }

    return (
      <>
        <StyledButton type="default" onClick={showRegister}>
          Зарегистрироваться
        </StyledButton>
        <StyledButton type="primary" onClick={showLogin}>
          Войти
        </StyledButton>
      </>
    );
  }, [authStore.authorizationUser, logoutHandler, showRegister, showLogin]);

  return (
    <StyledWrapper>
      {authMenuPopup}
      <Modal
        title="Вход"
        open={loginVisible}
        onCancel={() => setLoginVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Введите email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Регистрация"
        open={registerVisible}
        onCancel={() => setRegisterVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleRegistration}
          autoComplete="off"
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              { required: true, message: "Введите имя пользователя" },
              { min: 2, message: "Минимум 2 символа" },
            ]}
          >
            <Input placeholder="Имя пользователя" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Введите email" },
              { type: "email", message: "Введите корректный email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: "Введите пароль" },
              { min: 6, message: "Минимум 6 символов" },
            ]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledWrapper>
  );
};
