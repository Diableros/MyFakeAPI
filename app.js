const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.disable('etag');
app.use(
	cors({
		origin: ['*'],
	})
);

app.get('/', (req, res) => {
	res.format({
		'text/html'() {
			res.send(`<head>
		  <meta charset="UTF-8" />
		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <title>My Fake API</title>
		  <style>
			  body {
				  font-family: 'Arial';
			  }
		  </style>
	  </head>
	  <body>
		  <h3>/numstring/:num - obj with number in string format</h3>
		  <pre>
[
  {
    num: ":num"
  }
]
		  </pre>
		  <br>
		  <h3>/randomcode/:num - obj with random code having length = :num</h3>
		  <pre>
[
  {
    randCode: "..."
  }
]
		  </pre>
		  <br>
	  </body>
	  </html>`);
		},
	});
});

app.get('/numstring/:num', (req, res) => {
	const num = req.params.num;
	res.json([{ num: `${num}` }]);
});

app.get('/randomcode/:num', (req, res) => {
	const num = req.params.num;
	const chars =
		'0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split(
			''
		);
	const resArr = [];

	for (let i = 0; i < num; i++) {
		const curIndex = Math.floor(Math.random() * chars.length);
		// console.log(curIndex);
		resArr.push(chars[curIndex]);
	}
	// console.log(resArr);
	res.json([{ randCode: `${resArr.join('')}` }]);
});

app.listen(port, () => console.log(`MyFakeApp listening on port ${port}!`));
