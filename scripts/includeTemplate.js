const includeTemplate = function (el, url) {
    var localTest = /^(?:file):/,
        xmlhttp = new XMLHttpRequest(),
        status = 0;

    xmlhttp.onreadystatechange = function () {
        /* if we are on a local protocol, and we have response text, we'll assume
*  				things were sucessful */
        if (xmlhttp.readyState == 4) {
            status = xmlhttp.status;
        }
        if (localTest.test(location.href) && xmlhttp.responseText) {
            status = 200;
        }
        if (xmlhttp.readyState == 4 && status == 200) {
            el.outerHTML = xmlhttp.responseText;
        }
    }

    try {
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    } catch (err) {
        console.log(err)
    }
}

document.querySelectorAll('template[src]').forEach((el) => {
    includeTemplate(el, el.getAttribute('src'));
})
