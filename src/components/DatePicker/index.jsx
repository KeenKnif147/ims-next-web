import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import MDatePicker from 'rmc-date-picker'
import 'rmc-date-picker/assets/index.css'
import en_US from 'rmc-date-picker/lib/locale/en_US'
import PopPicker from 'rmc-date-picker/lib/Popup'
import 'rmc-picker/assets/index.css'
import 'rmc-picker/assets/popup.css'
import { getDiff } from '../../hooks/expiry-date'
import { useCheckMobile } from '../../hooks/utils'

const CustomDatePicker = ({
  onChange,
  placeholder,
  value,
  format,
  minDate,
  maxDate,
  ...rest
}) => {
  const { isMobile } = useCheckMobile()
  const checkDisabledDate = (current) => {
    if ((minDate && getDiff(minDate, current) < 0) || (maxDate && getDiff(maxDate, current) > 0)) {
      return true
    }
    return false
  }

  if (!isMobile) {
    return (
      <DatePicker
        disabledDate={checkDisabledDate}
        value={value}
        placeholder={format}
        onChange={onChange}
        format={format}
        {...rest}
      />
    )
  }

  return (
    <PopPicker
      datePicker={(
        <MDatePicker
          minDate={minDate?.toDate()}
          maxDate={maxDate?.toDate()}
          defaultDate={new Date()}
          mode="date"
          locale={en_US}
          formatMonth={(month => <div>Tháng {month + 1}</div>)}
        />
      )}
      transitionName="rmc-picker-popup-slide-fade"
      maskTransitionName="rmc-picker-popup-fade"
      title={placeholder}
      date={value && moment(value)
      ?.toDate()}
      onChange={date => onChange(moment(date))}
      dismissText="Đóng"
    >
      <div className="ant-calendar-picker-input ant-input">
        {value ? moment(value)
          .format(format) : ''}
      </div>
    </PopPicker>
  )
}

export default React.memo(CustomDatePicker)
