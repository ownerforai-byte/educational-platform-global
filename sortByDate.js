```javascript
function sortByDate(arr, dateKey) {
  return arr.sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
}
```