const headers = ['Buttons', 'Inputs']
export const storySort = (a, b) => {
  const aHeader = a[1].kind
  const bHeader = b[1].kind

  console.log({ aHeader, bHeader })
  if (aHeader !== bHeader) {
    const aHeaderIndex = headers.findIndex((h) => h === aHeader)
    const bHeaderIndex = headers.findIndex((h) => h === bHeader)

    console.log({ aHeader, bHeader }, { aHeaderIndex, bHeaderIndex })
    return aHeaderIndex - bHeaderIndex
  }

  return 0
}
