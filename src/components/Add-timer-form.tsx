import { Button, Flex } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';

export interface AddTimerInputValues {
  name: string;
  timer: string;
  style: string;
  variant: string;
  date: string;
  time: string;
}

const initialValues = {
  name: '',
  timer: '00:00:00',
  style: 'Green',
  variant: 'VarTime',
  date: '',
  time: '',
};

interface FormErrorProps {
  name: string;
}

const FormError = ({ name }: FormErrorProps) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <p className="text-red-500">{message}</p>}
    />
  );
};

export interface AddTimerFormProps {
  onSubmit: (values: AddTimerInputValues) => void | Promise<void>;
}

export default function AddTimerForm({ onSubmit }: AddTimerFormProps) {
  const labelNameId = useId();
  const labelTimerId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form
          autoComplete="off"
          className="flex flex-col gap-5"
        >
          <p className="m-auto text-xl ">Add new timer</p>
          <div className="mt-3">
            <label htmlFor={labelNameId}>Name of timer:</label>
            <Field
              type="text"
              name="name"
              className="mt-1 w-full py-1 px-2 border-2 rounded-lg border-gray-600"
              title="Name may contain only letters, apostrophe, dash and spaces."
              placeholder="Name"
              id={labelNameId}
              required
            />
            <FormError name="name" />
          </div>
          <Flex
            gap="large"
            align="center"
            justify="center"
          >
            <label className="flex align-items-center gap-2 text-xl">
              <Field
                type="radio"
                name="variant"
                value="VarTime"
              />
              Timer until time
            </label>

            <label className="flex align-items-center gap-2 text-xl">
              <Field
                type="radio"
                name="variant"
                value="VarDateTime"
              />
              Timer until date and time
            </label>
          </Flex>
          {values.variant === 'VarTime' && (
            <div>
              <label htmlFor={labelTimerId}>Timer:</label>
              <Field
                className="m-auto text-3xl mb-3"
                id={labelTimerId}
                type="time"
                name="timer"
                step="1"
              />
            </div>
          )}
          {values.variant === 'VarDateTime' && (
            <>
              <div>
                <label htmlFor="date">Date:</label>
                <Field
                  className="m-auto text-3xl mb-3"
                  required
                  type="date"
                  id="date"
                  name="date"
                />
              </div>
              <div>
                <label htmlFor="timeUntil">Time:</label>
                <Field
                  className="m-auto text-3xl mb-3"
                  required
                  type="time"
                  id="timeUntil"
                  name="time"
                  step="1"
                />
              </div>
            </>
          )}

          <Flex
            gap="middle"
            role="group"
            aria-labelledby="style-radio-group"
          >
            <Flex
              gap="small"
              className="w-[100px] px-3.5 py-1 rounded-full text-sm bg-green-100 text-green-700"
            >
              <Field
                className="mr-2"
                type="radio"
                name="style"
                value="Green"
              />
              Green
            </Flex>

            <Flex
              gap="small"
              className="w-[100px] px-3.5 py-1 rounded-full text-sm bg-red-100 text-red-700"
            >
              <Field
                className="mr-2"
                type="radio"
                name="style"
                value="Red"
              />
              Red
            </Flex>
            <Flex
              gap="small"
              className="w-[100px] px-3.5 py-1 rounded-full text-sm bg-orange-100 text-orange-700"
            >
              <Field
                className="mr-2"
                type="radio"
                name="style"
                value="Orange"
              />
              Orange
            </Flex>
            <Flex
              gap="small"
              className="w-[100px] px-3.5 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
            >
              <Field
                className="mr-2"
                type="radio"
                name="style"
                value="Blue"
              />
              Blue
            </Flex>
          </Flex>

          <Button
            type="primary"
            htmlType="submit"
          >
            Add timer
          </Button>
        </Form>
      )}
    </Formik>
  );
}
