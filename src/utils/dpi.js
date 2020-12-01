(function (){
    let head = document.getElementsByTagName("head");
    let meta = document.createElement("meta");
    let scale = window.screen.width /750;
    var str = `width=750, initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}, user-scalable=no,target-densitydpi=device-dpi,minimal-ui,uc-fitscreen=no`;
    // var str1 = `width=device-width,initial-scale=1, user-scalable=no,target-densitydpi=device-dpi,minimal-ui,uc-fitscreen=no`;
    meta.name = 'viewport'
    meta.content = str;
    head[0].appendChild(meta);
})()