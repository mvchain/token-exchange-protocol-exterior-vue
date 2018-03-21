export function timeFilter(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  if (!time) return '--';
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  let timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function changeTimeStamp(timeStamp) {
  if (!isNaN(timeStamp)) {
    if (timeStamp < 0) {
      timeStamp = Number(String(timeStamp).replace('-', ''));
    }
    let day = Math.floor((timeStamp / 1000 / 3600) / 24);
    let hour = Math.floor((timeStamp / 1000 / 3600) % 24);
    let min = Math.floor((timeStamp / 1000 / 60) % 60);

    if (day < 10) {
      day = '0' + day;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }

    return day + '天' + hour + '小时' + min + '分';
  } else {
    return '已截止！';
  }
}
