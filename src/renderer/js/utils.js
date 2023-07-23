const utils = {};

utils.loadJs = async function(js_url){
    const str = await main_process.getJsFile(js_url);
    const val = new Function(str);
    const data = val();
    return data;
}


test = async function(url){
    const val = await utils.loadJs(url);
    console.log(val);
    // const script = document.createElement('script');
    // script.src =  URL.createObjectURL(new Blob([str])) ;
    // document.body.appendChild(script)
}