import { Form, Input, Modal } from "antd";

interface CreateFormModalProps {
  formName: string;
  error: string;
  isModalOpen: boolean;
  onOkHandler: () => void;
  onCancelHandler: () => void;
  onChangeFormName: (name: string) => void;
}

export const CreateFormModal = ({
  isModalOpen,
  onOkHandler,
  formName,
  error,
  onCancelHandler,
  onChangeFormName,
}: CreateFormModalProps) => {
  return (
    <Modal
      title="Новая форма"
      open={isModalOpen}
      onOk={onOkHandler}
      onCancel={onCancelHandler}
      okText="Создать"
      cancelText="Отмена"
    >
      <Form layout="vertical">
        <Form.Item
          label="Название формы"
          validateStatus={error ? "error" : ""}
          help={error}
        >
          <Input
            value={formName}
            onChange={(event) => {
              onChangeFormName(event.target.value);
            }}
            placeholder="Введите название формы"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
