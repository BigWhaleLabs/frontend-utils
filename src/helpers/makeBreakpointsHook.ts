import { useEffect, useState } from 'react'

const xsSize = 280
const smSize = 375
const mdSize = 600
const lgSize = 1024

function calcBreakPointsDefault(width: number) {
  return {
    width,
    xs: width >= xsSize && width < smSize,
    sm: width >= smSize && width < mdSize,
    md: width >= mdSize && width < lgSize,
    lg: width >= lgSize,
  }
}

export default function (calcBreakPoints = calcBreakPointsDefault) {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizer = () => setWidth(window.innerWidth)

    window.addEventListener('resize', resizer)
    return () => window.removeEventListener('resize', resizer)
  }, [])

  return calcBreakPoints(width)
}
