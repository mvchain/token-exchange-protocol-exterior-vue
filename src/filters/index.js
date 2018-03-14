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

export function statusFilter(n) {
  switch (n) {
    case 0:
      return '在建';
    case 1:
      return '完工';
    case 2:
      return '未开工';
  }
}
export function typeFilter(n) {
  switch (n) {
    case 0:
      return '测试';
    case 1:
      return '预决算';
  }
}
export function nameFilter(n) {
  if (n.length > 33) {
    return n.slice(0, 32) + '...';
  }
  return n;
}

export function tableNameFilter(n) {
  if (n.length > 13) {
    return n.slice(0, 12) + '...';
  }
  return n;
}
export function formatCurrency(num) {
  let cents;
  if (isNaN(num)) {
    return '0.00';
  }
  num = num.toString().replace(/\$|,/g, '');
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }
  return (num + '.' + cents);
}
export function approvalFilter(n) {
  switch (n) {
    case 1:
      return '未提交';
    case 2:
      return '待验收';
    case 3:
      return '驳回';
    case 4:
      return '通过';
  }
}
export function workTypeFilter(n) {
  switch (n) {
    case 10:
      return '审核未通过';
    case 20:
      return '审核中';
    case 30:
      return '待支付';
    case 40:
      return '待指派';
    case 50:
      return '待作业';
    case 60:
      return '作业中';
    case 70:
      return '待验收';
    case 80:
      return '已完成';
    case 90:
      return '已关闭';
  }
}

export function bitFilter(n) {
  if (!n) return '0Kb';
  if (n <= 1024000) {
    return (n / 1024).toFixed(2) + 'Kb';
  } else {
    return (n / 1024 / 1024).toFixed(2) + 'Mb';
  }
}
export function idCardFilter(n) {
  if (!n) return '****************';
  if (n <= 1024000) {
    return (n / 1024).toFixed(2) + 'Kb';
  } else {
    return (n / 1024 / 1024).toFixed(2) + 'Mb';
  }
}
export function titleFilter(n) {
  switch (n) {
    case 'prejudgment':
      return '预决算任务';
  }
}
export function phoneNumFilter(p) {
  if (!p) return;
  if (p.indexOf('-') === -1) {
    return p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  } else {
    return p.substring(0, 9) + '****';
  }
}
