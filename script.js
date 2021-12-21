function saveToFile_Chrome(fileName, content) {
    // var blob = new Blob([content], { type: 'text/plain' });
    // var blob = new Blob([content], { type: 'application/json' });
    var blob = new Blob([content], { type: 'application/xml' });
    objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    a.click();
}

function openTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "application/json"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        console.log(event.target.files)
        Object.keys(event.target.files).forEach((e,idx)=>{
            Input.push(processFile(event.target.files[idx], idx));
        })
        // processFile(event.target.files[0]);
    };
    input.click();
}

function openXMLFile() {
    var input = document.createElement('input');
    input.type = "file";
    input.multiple = true;
    input.accept = "application/xml"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = (event) => {
        Object.keys(event.target.files).forEach((e,idx)=>{
            Input.push(XMLProcessFile(event.target.files[idx], idx));
            let name = event.target.files[e].name;
            console.log(e)
            name.replace(".xml", "");
            FileName.push(name);
        })
    };
    input.click();
}

function XMLProcessFile(file ,idx) {
    var reader = new FileReader();
    var paser = new DOMParser();
    reader.onload = function () {
        Input[idx] = reader.result;
    };
    reader.readAsText(file, /* optional */ "utf-8");

}

function processFile(file ,idx) {
    var reader = new FileReader();
    reader.onload = function () {
        Input[idx] = JSON.parse( reader.result );
    };
    reader.readAsText(file, /* optional */ "utf-8");

}

// let Input = [];
// document.querySelector('button.convert').addEventListener('click', e=>{   
//     // console.log(input);
//     Input.forEach((e, idx)=>{
//         setTimeout(el=>{
//             let str = JSON.stringify(Input[idx]);
//             Object.keys(filter).forEach(e=>{
//                 str = str.replaceAll(e, filter[e]);
//             })
//             saveToFile_Chrome('output',str)
//         }, 1000 * idx);
//     });
// });

// xml
let Input = [];
let FileName = [];
document.querySelector('button.convert').addEventListener('click', e=>{   
    // console.log(input);
    Input.forEach((e, idx)=>{
        setTimeout(el=>{
            let str = Input[idx];
            str = str.replace(/group_id="[0-9]+"/gi, "");
            str = str.replace(/.[0-9]+\+[0-9]+:[0-9]+<\/created>/gi, "</created>");
            str = str.replace(/.[0-9]+\+[0-9]+:[0-9]+<\/updated>/gi, "</updated>");
            str = str.replace(/.[0-9]+\+[0-9]+:[0-9]+<\/dumped>/gi, "</dumped>");
            // Object.keys(filter).forEach(e=>{
            //     str = str.replaceAll(e, filter[e]);
            // })
            saveToFile_Chrome(FileName[idx],str)
        }, 1000 * idx);
    });
});