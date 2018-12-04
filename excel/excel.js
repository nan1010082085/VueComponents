/*
 * npm i xlsx file-saver -S
 *
 * @XlSX js-xlsx 将JSON数据或dom转换工作表等
 * @FileSaver  将数据生成 blob 二进制流
 *
 * 本 例子为 vue mixins 混入 实现前端导出xlsx
 * */

import XLSX      from 'xlsx'
import FileSaver from 'file-saver'

export default {
  data () {
    return {
      xlsxData : null
    }
  },
  methods : {
    //导出
    excelplus ( data, xlsxname ) {
      let rex = /(Object)/g;
      //json 对象生成xlsx
      if ( data.toString().match(rex) ) {
        let ws = XLSX.utils.json_to_sheet(data)  //数组对象 转化为工作表
        let sheet_json = XLSX.utils.sheet_to_json(ws, { header : 1 }); //将工作表转化为数据数组 提取第一个为表头
        
        let worksheet = XLSX.utils.aoa_to_sheet(sheet_json); //将新的数据数表转化为工作表
        let new_workbook = XLSX.utils.book_new();
        
        XLSX.utils.book_append_sheet(new_workbook, worksheet, xlsxname + '.xlsx');
        
        XLSX.writeFile(new_workbook, xlsxname + '.xlsx') //生成xlsx
        
      }
      //dom 生成 xlsx
      else {
        let wb = XLSX.utils.table_to_book(data);
        let wbout = XLSX.write(wb, { bookType : 'xlsx', bookSST : true, type : 'array' });
        try {
          let blob = new Blob([ wbout ], { type : 'application/octet-stream' }); //blob 二进制数据流
          FileSaver.saveAs(blob, xlsxname + '.xlsx')  //保存url
        } catch ( e ) {
          console.log(e, wbout)
        }
        return wbout;
      }
    },
    elcelpush ( file ) {
      let self = this;
      let f = file
      let wb;//读取完成的数据
      let rABS = false; //是否将文件读取为二进制字符串
      let xlsdata;
      let reader = new FileReader();
      reader.onload = function ( e ) {
        let data = e.target.result;
        if ( rABS ) {
          wb = XLSX.read(btoa(self.fixdata(data)), {//手动转化
            type : 'base64'
          });
        } else {
          wb = XLSX.read(data, {
            type : 'binary'
          });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        xlsdata = XLSX.utils.sheet_to_json(wb.Sheets[ wb.SheetNames[ 0 ] ])
        self.xlsxData = xlsdata;
      };
      
      if ( rABS ) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
      
    },
    fixdata ( data ) { //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for ( ; l < data.byteLength / w ; ++l ) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    }
    
  }
}