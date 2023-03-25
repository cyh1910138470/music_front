const handleTime = (stamp) => {
  let mins = Math.floor((stamp / 1000) / 60).toString.length === 1 ? '0' + Math.floor((stamp / 1000) / 60).toString() : Math.floor((stamp / 1000) / 60).toString()
  let seconds = Math.floor((stamp / 1000) % 60).toFixed(0).toString().length === 1 ? '0' + Math.floor((stamp / 1000) % 60).toFixed(0).toString() : Math.floor((stamp / 1000) % 60).toFixed(0).toString()
  return `${mins}:${seconds}`
}
export default handleTime