/*
    td2xml
*/
export default function (xmldecl = true) {

    let ns = {}

    function namespace (name, url) {
        if (url) {
            ns[name] = url;
        }
        return ns[name];
    }

    function parse (td, inner) {
        if (Array.isArray(td)) {
            if (td.length === 0) return '';
            if (typeof td[0] !== 'string') throw new Error('not tdstruct: ' + td[0]);
            let ident = td.shift()
             ,  n = ident.split(/[\.#]/)
             ,  t = ident.split(/[^\.#]+/)
             ,  e, c = [], id;
            if (t[0] == '') {
              t.shift();
            }
            for (let i=0; i<n.length; i++) {
              if (i === 0) {
                e = n[i];
              } else {
                if (t[i-1] === '.') {
                  c.push(n[i]);
                } else if (t[i-1] === '#') {
                  id = n[i];
                }
              }
            }
            let s = '';
            if (!inner && xmldecl) {
                s += '<?xml version="1.0" encoding="utf-8" ?>\n';
            }
            s += '<' + e +
            (id ? ' id="' + id + '"' : '') +
            (c.length > 0 ? ' class="' + c.join(' ') + '"' : '');
            if (!inner && ns) {
                for (k in ns) {
                    s += ' xmlns:' + k + '="' + ns[k] + '"';
                } 
            }
            let cont = '';
            while (td.length > 0) {
                let next = td.shift();
                if (typeof next === 'string') {
                    cont += next;
                } else if (Array.isArray(next)) {
                    cont += parse(next, true);
                } else if (typeof next === 'object') {
                    let k = Object.keys(next);
                    k.forEach(function (a) {
                        s += ' ' + a + '="' + next[a] + '"';
                    });
                }
            }
            s += '>' + cont + '</' + e + '>';
            return s;
        }
     }

     return {
        parse: parse,
        namespace: namespace,
        xmldecl: xmldecl
    };

}




