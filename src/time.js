function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
  
function secondsToTime(seconds) {
  return [...Array(2).keys()].reduce((result, index) => {
    result.push(result[index] % Math.pow(60, 2-index));
    result[index] = Math.floor(result[index] / Math.pow(60, 2-index));
    return result;
  }, [Math.round(seconds)]).map(value => pad(value, 2)).join(":");
}

export default secondsToTime;