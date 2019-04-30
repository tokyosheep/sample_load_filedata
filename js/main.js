/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/


window.onload = function(){
    `use strict`;
    const csInterface = new CSInterface();
    themeManager.init();
    const path = require(`path`);
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = require(`path`).join(dir_home, `Desktop`);//デスクトップパス
    
    const load = document.getElementById(`load`);
    const file_list = document.getElementById(`file_list`);
   
    
    load.addEventListener(`click`,()=>{
        const f = cep.fs.showOpenDialog(true,false,`open`,dir_desktop);//ダイアログでファイルを選ぶ
        if(f.data.length<1){
            alert(`ファイルが選ばれていません`);
            return;
        }
        while(file_list.firstChild){
            file_list.removeChild(file_list.firstChild);
        }
        /*=================各種　pathデータ取得メソッド===================*/
        console.log(`dir:: ` + path.dirname(f.data[0]));//ファイルのパス
        console.log(`ext:: ` + path.extname(f.data[0]));//ファイルの拡張子
        console.log(`filename:: ` + path.basename(f.data[0]));//ファイルネーム
        console.log(`name:: ` + path.basename(f.data[0],path.extname(f.data[0])));//ファイルネーム（拡張子抜き）
        
        const files = Array.from(f.data);//array objectに変換
        files.forEach(v=>{
            const obj = path.parse(v);//取得したパスデータからディレクトリーや拡張子をオブジェクトとしてを取得
            console.log(obj);
            const list_li = document.createElement(`li`);
            file_list.appendChild(list_li);
            const ul = document.createElement(`ul`);
            list_li.appendChild(ul);
            Object.entries(obj).forEach((v,i)=>{//取得したオブジェクトのプロパティを書き出す
                const li = writeLi(`${v[0]}::${v[1]}`);
                ul.appendChild(li);
            });
            imgLoad(ul,v);
        });
        function writeLi(text){//li情報セット関数
            const element = document.createElement(`li`);
            element.textContent = text;
            return element;
        }
        function imgLoad(parent,filePath){
            const img = new Image();
            img.src = filePath;
            img.onload = () =>{//img要素の取得は非同期なので注意
                const width = writeLi(`width:: ${img.naturalWidth}`);//画像データの高さと幅を読み込み
                parent.appendChild(width);
                const height = writeLi(`height:: ${img.naturalHeight}`);
                parent.appendChild(height);
            }
        }
        
    });
}
    
