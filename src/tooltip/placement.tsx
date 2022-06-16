export interface Offset {
  top: number
  left: number
  bottom: number
  right: number
}

export type PlacementType = 'top' | 'bottom'

export const generateOffset = (args: {
  offset: Partial<Offset>
  initial: Offset
}) => {
  const { offset, initial } = args

  let result: Offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }

  for (const key in result) {
    let initialValue = initial[key] || 0
    let offsetValue = offset[key] || 0

    result[key] = initialValue + offsetValue
  }

  return result
}

const placementTop: Offset = {
  top: -10,
  bottom: 0,
  left: 0,
  right: 0,
}

const placementBottom: Offset = {
  top: 10,
  bottom: 0,
  left: 0,
  right: 0,
}

const placementOffset: {
  [index in PlacementType]: (offset: Partial<Offset>) => Offset
} = {
  top: (value) => {
    return generateOffset({
      offset: value,
      initial: placementTop,
    })
  },
  bottom: (value) => {
    return generateOffset({
      offset: value,
      initial: placementBottom,
    })
  },
}

const parentOffset: {
  [index in PlacementType]: (el: HTMLElement) => Partial<Offset>
} = {
  bottom: (el) => {
    const rect = el.getBoundingClientRect()
    const result = rect.height

    return {
      top: result,
    }
  },
  top: (el) => {
    const result = -el.offsetHeight
    return {
      top: result,
    }
  },
}

export { placementOffset, parentOffset }
