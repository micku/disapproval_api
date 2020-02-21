const yaml = require('js-yaml');
const fs = require('fs');

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
    if (!fs.existsSync(BASE_DIR)){
        fs.mkdirSync(BASE_DIR);
    }

    erase();

    const sourceCategories = yaml.safeLoad(fs.readFileSync('looks.wtf/tags.yml', 'utf8'));
    sourceCategories.push('all')
    fs.writeFileSync(`${BASE_DIR}/categories.json`, JSON.stringify(Array.from(
                    sourceCategories,
                    x => { return { 'name': x, 'file': `${x}.json` } }
                    )), 'utf8');

    const sourceLooks = yaml.safeLoad(fs.readFileSync('looks.wtf/looks.yml', 'utf8'));
    
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
        fs.writeFileSync(`${BASE_DIR}/${cat}.json`, JSON.stringify(faces), 'utf8');
    });

    fs.writeFileSync(`${BASE_DIR}/all.json`, JSON.stringify(looks), 'utf8');

    fs.copyFileSync('CNAME', `${BASE_DIR}/CNAME`);
}
catch (e) {
    console.log(e);
}
