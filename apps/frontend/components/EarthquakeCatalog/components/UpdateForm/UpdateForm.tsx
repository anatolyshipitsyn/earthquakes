import React, { useCallback } from 'react';
import { Button, Form, Modal } from 'antd';
import { ProFormText, ProFormDigit, ProForm } from '@ant-design/pro-components';
import { UpdateFormProps, UpdateFormValues } from './UpdateFormProps';

export const UpdateForm: React.FC<UpdateFormProps> = ({
  onCancel,
  onSubmit,
  onDelete,
  values,
  ...props
}) => {
  const [form] = Form.useForm<UpdateFormValues>();
  const cancelHandler = useCallback(() => onCancel(), [onCancel]);

  const handleDelete = useCallback(() => {
    if (values?.id) {
      onDelete(values.id);
    }
  }, [onDelete, values]);

  const handleSubmit = useCallback(() => {
    form.submit();
  }, [form]);

  return (
    <Modal
      destroyOnClose
      title="Edit Earthquake"
      open={props.updateModalOpen}
      onCancel={cancelHandler}
      footer={[
        <Button key="delete" danger onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="cancel" onClick={cancelHandler}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <ProForm<UpdateFormValues> onFinish={onSubmit} initialValues={values}>
        <ProFormText
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter the location' }]}
        />
        <ProFormDigit
          name="magnitude"
          label="Magnitude"
          rules={[{ required: true, message: 'Please enter the magnitude' }]}
        />
        <ProFormText
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select the date' }]}
        />
      </ProForm>
    </Modal>
  );
};
