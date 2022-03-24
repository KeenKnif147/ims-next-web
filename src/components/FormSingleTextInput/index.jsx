import React, { useMemo } from 'react'
import { Form } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import MakeAsyncFunction from 'react-redux-promise-listener'
import { promiseListener } from '../../redux/store/configureStore'
import { success, failure } from '../../redux/actions'
import { Input, InputPassword, InputSearch } from '../Input'
import './styles.less'

const InputForm = ({
  componentProps,
  handleSubmit,
  inputRef,
  form,
}) => {
  const {
    search, password, label, fieldName, help = true, hasFeedback = true, ...otherComponentProps
  } = componentProps

  return (
    <Form
      onSubmit={handleSubmit}
      layout="inline"
    >
      <Field
        name={fieldName}
        {...otherComponentProps}
      >
        {({
          meta,
          input,
        }) => {
          const {
            touched, invalid, submitFailed, submitSucceeded, submitError,
          } = meta
          const hasError = touched && (invalid || submitFailed)
          const feedback = hasFeedback && (submitFailed || submitSucceeded)

          return (
            <Form.Item
              label={label}
              validateStatus={hasError ? 'error' : 'success'}
              hasFeedback={feedback}
              help={help && hasError && submitError}
            >{
          (() => {
            if (password) {
              return <InputPassword {...otherComponentProps} {...input} ref={inputRef} />
            } if (search) {
              return <InputSearch {...otherComponentProps} {...input} ref={inputRef} onSearch={() => form.submit()} />
            }

            return <Input {...otherComponentProps} {...input} ref={inputRef} />
          })()
        }
            </Form.Item>
          )
        }}
      </Field>
    </Form>
  )
}

const ControlledForm = Form.create()(InputForm)

const FormSingleTextInput = React.forwardRef(({
  dispatchedAction,
  history,
  fieldName,
  preparePayload,
  preflight = () => Promise.resolve(), // additional action before submitting. E.g. confirm
  clearOnSuccess = false,
  ...rest
}, ref) => {
  if (!dispatchedAction) {
    throw new Error('dispatchedAction is required for FormSingleTextInput')
  }

  if (!fieldName) {
    throw new Error('fieldName is required for FormSingleTextInput')
  }

  const [actionType, successActionType, failureActionType] = useMemo(() => {
    if (typeof dispatchedAction === 'string') {
      return [dispatchedAction, success(dispatchedAction), failure(dispatchedAction)]
    }

    return [dispatchedAction.type, dispatchedAction.success.type, dispatchedAction.failure.type]
  }, [dispatchedAction])

  return (
    <div className="single-text-input-form">
      <MakeAsyncFunction
        listener={promiseListener}
        start={actionType}
        resolve={successActionType}
        reject={failureActionType}
        setPayload={(action, payload) => {
          const newPayload = preparePayload ? preparePayload(payload) : {}

          for (const key of Object.keys(payload)) {
            newPayload[key] = payload[key].trim()
          }

          if (history) {
            return {
              ...action, ...newPayload, history, payload: newPayload,
            }
          }

          return { ...action, ...newPayload, payload: newPayload } // to make it work both on old and new code
        }}
        getError={action => action.error || action.payload?.error}
      >{asyncFunc => {
        const handleFormSubmit = (values, form) => {
          // eslint-disable-next-line no-param-reassign
          values[fieldName] = values[fieldName]?.replace('\0', '') // Remove null character, scan devices auto input this value

          if (!values[fieldName]) {
            return { [fieldName]: 'Vui lòng nhập dữ liệu' }
          }

          return preflight().then(() => asyncFunc(values)
          // Should returns null if success or final-form will consider
          // resolving error object: https://final-form.org/docs/react-final-form/examples/submission-errors
            .then(() => {
              if (clearOnSuccess) {
                form.change(fieldName, undefined)
              }
            })
            .catch(error => {
              const message = error && (error.errorMessage || error.message)

              if (error.field) {
                if (error.field === fieldName) {
                  return { [fieldName]: message || 'Có lỗi xảy ra' }
                }

                return Promise.resolve()
              }

              return { [fieldName]: message || 'Có lỗi xảy ra' }
            }), () => null)
        }

        return (
          <FinalForm
            onSubmit={handleFormSubmit}
            component={ControlledForm}
            componentProps={{ ...rest, fieldName }}
            inputRef={ref}
          />
        )
      }}
      </MakeAsyncFunction>
    </div>
  )
})

export default FormSingleTextInput
