function uppercase (number) {
  if(typeof number !== 'number'){
    console.error(new Error('params is not [Number]'));
    return
  }
  const date = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' ]
  return date.map((data,index)=>{
    if(index === Number(number) -1){
      return data
    }
  }).filter(data=>data)[0]
}

export {
  uppercase
}