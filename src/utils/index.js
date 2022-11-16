
/**
 * 格式化文件大小单位
 * @param {Number} value 
 * @returns 
 */
export const formatFileUnit = (value) => {
  // eslint-disable-next-line no-restricted-globals
  if(!value || isNaN(value)) {
      return "0 Bytes";
  }
  const unitArr = ["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"];
  let index = 0;
  const fileSize = parseFloat(value);
  index = Math.floor(Math.log(fileSize) / Math.log(1024));
  // eslint-disable-next-line no-restricted-properties
  const formatSize = (fileSize / Math.pow(1024, index)).toFixed(2);
  return `${formatSize}${unitArr[index]}`;
}