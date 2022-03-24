import React, { useEffect, useState, useMemo } from 'react'
import { Typography } from 'antd'
import moment from 'moment'

const { Text } = Typography

const humanize = minutes => {
  const hour = Math.floor(minutes / 60)
  const min = minutes % 60

  if (hour === 0) {
    return `${min} phút`
  }

  return `${hour} tiếng ${min} phút`
}

const exsdReport = (time, threshold = 1) => {
  const diff = moment(time).diff(moment())
  const leftDuration = moment.duration(diff)
  const thresholdDuration = moment.duration(threshold, 'hours')

  return {
    aboutToLate: (leftDuration.asMinutes() >= 0) && leftDuration.asMinutes() < thresholdDuration.asMinutes(),
    late: leftDuration.asMinutes() < 0,
    left: humanize(Math.abs(Math.ceil(leftDuration.asMinutes()))),
  }
}

const TimeDisplayer = ({ time, threshold }) => {
  const [aboutToLate, setAboutToLate] = useState(false)
  const [late, setLate] = useState(false)
  const [left, setLeft] = useState(null)
  const textType = useMemo(() => (late || aboutToLate ? 'danger' : null), [late, aboutToLate])

  const checkTime = () => {
    const report = exsdReport(time, threshold)

    setAboutToLate(report.aboutToLate)
    setLate(report.late)
    setLeft(report.left)
  }

  useEffect(() => {
    let timeoutId
    let intervalId

    if (threshold) {
      checkTime()

      timeoutId = setTimeout(() => {
        checkTime()

        intervalId = setInterval(() => {
          checkTime()
        }, 60000)
      }, (60 - (new Date()).getSeconds()) * 1000)
    }

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <Text type={textType} style={{ marginRight: '3px' }}>{moment(time).format('DD/MM/YYYY HH:mm:ss')}</Text>
      <Text type={textType} style={{ display: 'inline-block' }}>
        {late ? `(đã trễ ${left})` : null}
        {aboutToLate ? `(sắp trễ, còn ${left})` : null}
      </Text>
    </>
  )
}

export default React.memo(TimeDisplayer)
