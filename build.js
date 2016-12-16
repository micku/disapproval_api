const yaml = require('js-yaml');
const fs = require('fs');
const util = require('util');

const BASE_DIR = 'build';

var erase = function() {
    try { var files = fs.readdirSync(`${BASE_DIR}/`); }
    catch(e) { return; }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {

            var filePath = `${BASE_DIR}/${files[i]}`;
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
            else {
                rmDir(filePath);
            }

        }
    }
}

var rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {

            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
            else {
                rmDir(filePath);
            }

        }
    }
    fs.rmdirSync(dirPath);
};

try {
    erase();

    const sourceCategories = yaml.safeLoad(fs.readFileSync('looks.wtf/data/tags.yml', 'utf8'));
    fs.writeFileSync(`${BASE_DIR}/categories.json`, util.inspect(Array.from(
                    sourceCategories,
                    x => { return { 'name': x, 'file': `${x}.json` } }
                    )), 'utf8');

    const sourceLooks = yaml.safeLoad(fs.readFileSync('looks.wtf/data/looks.yml', 'utf8'));
    
    let looks = [];
    sourceLooks.forEach(item => {
        looks.push({
            'title': item.title,
            'face': item.plain,
            'tags': item.tags.split(' ').filter(e => e !== '')
        });
    });

    sourceCategories.forEach(cat => {
        let faces = looks.filter(e => e.tags.indexOf(cat) > -1);
        fs.writeFileSync(`${BASE_DIR}/${cat}.json`, util.inspect(faces), 'utf8');
    });
}
catch (e) {
    console.log(e);
}
