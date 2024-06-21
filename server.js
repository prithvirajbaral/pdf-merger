const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { mergePDF } = require('./merge');
const path = require('path');
const app = express();
const port = 3000;

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files);
    await mergePDF(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    res.redirect("http://localhost:3000/static/merged.pdf");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
