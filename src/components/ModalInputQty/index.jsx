import {
  Button, Form, Modal, InputNumber, Typography, Icon,
} from 'antd'
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { DIALOG_NAMES } from '../../constants'
import { closeDialog } from '../../redux/actions/ui'
import {
  useFocusOnVisible,
} from '../../hooks/modals'

const { Text } = Typography

const ModalInputQty = ({
  submitAction, payload, min = 1, max,
}) => {
  const qtyInput = useRef(null)

  useFocusOnVisible(qtyInput)

  const [qty, setQty] = useState({
    value: 1,
  })

  const validateQty = number => {
    if (!Number.isInteger(number)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Số lượng không hợp lệ!',
      }
    }

    if (number < min) {
      return {
        validateStatus: 'error',
        errorMsg: `Số lượng tối thiểu được nhập là ${min}`,
      }
    }

    if (max && number > max) {
      return {
        validateStatus: 'error',
        errorMsg: `Số lượng tối đã được nhập là ${max}`,
      }
    }

    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  }

  const dispatch = useDispatch()
  const close = () => dispatch(closeDialog(DIALOG_NAMES.INPUT_QTY))

  const handleSubmit = () => {
    if (qty.validateStatus !== 'error') {
      dispatch({
        type: submitAction,
        payload: {
          qty: qty.value,
          ...payload,
        },
      })
      close()
    }
  }

  const handleInputEnter = e => {
    e.preventDefault()

    handleSubmit()
  }

  const handleQtyChange = value => {
    setQty({
      ...validateQty(value),
      value,
    })
  }

  return (
    <Modal
      title="Nhập số lượng"
      className="single-action-modal"
      visible={true}
      cancelText="Đóng"
      onCancel={close}
      centered
      footer={(
        <Button key="submit" onClick={handleSubmit} type="primary" disabled={qty.validateStatus === 'error'}>
          <Icon type="edit" />
          Cập nhật
        </Button>
      )}
    >
      <div>
        <Form>
          <Form.Item
            validateStatus={qty.validateStatus}
            help={qty.errorMsg}
            label={<Text strong>Số lượng SP</Text>}
            style={{ marginBottom: '0' }}
          >
            <InputNumber
              style={{ width: '100%' }}
              onChange={handleQtyChange}
              value={qty.value}
              ref={qtyInput}
              onPressEnter={handleInputEnter}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default React.memo(ModalInputQty)
