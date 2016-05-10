# td2xml
TDStruct (Tripledollar Structure) to XML transformation.


```js
var td2xml = require('./td2xml');

var parser = td2xml();
parser.namespace('xsl', 'http://www.w3.org/1999/XSL/Transform');

var xsl = ['xsl:stylesheet', {version: '1.0'},
		['xsl:output', {method:'xml'}],
		['xsl:template', {
			match: 'doc'
		},
			['body',
				['h1',
					['xsl:value-of', {
						select: '.'
					}]
				]
			]
		]
	];

var xml = parser.parse(xsl);

console.log(xml);
```

