/* 深拷贝对象 */
function getType ( obj ) {
  //tostring会返回对应不同的标签的构造函数
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]' : 'boolean',
    '[object Number]' : 'number',
    '[object String]' : 'string',
    '[object Function]' : 'function',
    '[object Array]' : 'array',
    '[object Date]' : 'date',
    '[object RegExp]' : 'regExp',
    '[object Undefined]' : 'undefined',
    '[object Null]' : 'null',
    '[object Object]' : 'object'
  };
  if ( obj instanceof Element ) {
    return 'element';
  }
  return map[ toString.call(obj) ];
}
function extendClone ( copyObj ) {
  var type = getType(copyObj);
  var obj;
  if ( type === 'array' ) {
    obj = [];
  } else if ( type === 'object' ) {
    obj = {};
  } else {
    //不再具有下一层次
    return copyObj;
  }
  if ( type === 'array' ) {
    for ( var i = 0, len = copyObj.length ; i < len ; i++ ) {
      obj.push(extendClone(copyObj[ i ]));
    }
  } else if ( type === 'object' ) {
    for ( var key in copyObj ) {
      obj[ key ] = extendClone(copyObj[ key ]);
    }
  }
  return obj;
}

export {
  extendClone
}