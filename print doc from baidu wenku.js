// add iframe
var iframe;
function addIframe(){
    var iframe = document.querySelector('iframe.evan');

    if(!iframe){
        iframe = document.createElement('iframe');
        iframe.classList.add('evan');

        document.body.insertBefore(iframe, document.body.children[0]);
    }

    console.log(iframe);
    return iframe;
}

iframe = addIframe();

//iframe.document.body.innerHTML = 'hello';

// var targetDom = document.querySelector('body > div > div:nth-child(2) > h2 > a');

// copy css style
function copySytle(targetDom, copiedDom){
    var cs = getComputedStyle(targetDom);

    for(var i=0;i<cs.length;i++){
        var pn = cs[i];
        var pv = cs.getPropertyValue(pn);
        copiedDom.style.setProperty(pn, pv);
    }
}



// tranverse children
function copyChildrenStyle(t, c){
    var tch = t.children;
    var cch = c.children;

    if(tch.length !== cch.length){
        throw 'children size is not equal';
    }

    if(tch.length === 0){
        return;
    }

    for(var i=0;i<tch.length;i++){
        copySytle(tch[i], cch[i]);
        copyChildrenStyle(tch[i], cch[i]);
    }
}

// copyChildrenStyle(targetDom, copiedDom);


function addPage(pn){
    console.log('try to add page', pn);
    // pageNo-1
    var targetDom = document.querySelector('#pageNo-'+ pn);

    if(!targetDom){
        throw 'page with number ' +pn+ ' not found';
    }

    // copy target to iframe
//     var copiedDomStr = targetDom.outerHTML;

    // clone page dom
    var div = document.createElement('div');
    div.innerHTML = targetDom.outerHTML;
    var copiedDom = div.children[0];
    copiedDom.parentElement.removeChild(copiedDom);

//     iframe.contentDocument.body.innerHTML = copiedDomStr;
//     var copiedDom = iframe.contentDocument.body.children[0];
    iframe.contentDocument.body.appendChild(copiedDom);

    // copy style
    copySytle(targetDom, copiedDom);

    // copy children style
    copyChildrenStyle(targetDom, copiedDom);

    console.log('page', pn, 'added.');
}


//
// var totalPageNumber = 79;

// var addedPn = 0;

// var addInterval = setInterval(function(){
//     console.log('try to add page', addedPn);

//     if(addedPn >= totalPageNumber){
//         clearInterval(addInterval);
//         console.log('finished:', addedPn);
//         return;
//     }

//     // try to add page
//     try{
//         addPage(addedPn+1);
//         addedPn++;
//         console.log('page ' + addedPn + ' added.')
//     }catch(e){
//         // do nothing
//     }    

// }, 1000);

