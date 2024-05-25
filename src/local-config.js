let localConfig = {
  header: `Sign-in Sheet`,

  nameListText: `Seat Number  ID Name
2 492000123 陳布甲
1 492000123 陳布丙
4 492000123 陳布乙
3 492000123 陳布丁`,

  cellTemplate: `{Seat Number}
{ID}
{Name}`
}

// ----------------------------------------------------------------

let localConfigEnv = {
  locale: 'zh-TW'
}

for (let name in localConfigEnv) {
  localConfig[name] = localConfigEnv[name]
}

export default localConfig