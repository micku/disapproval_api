const yaml = require('js-yaml');
const fs = require('fs');
const util = require('util');

try {
    const sourceCategories = yaml.safeLoad(fs.readFileSync('looks.wtf/data/tags.yml', 'utf8'));
    fs.writeFileSync('build/index.html', util.inspect(sourceCategories), 'utf8');

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
        if (!fs.existsSync(`build/${cat}/`)) {
            fs.mkdirSync(`build/${cat}/`);
        }
        fs.writeFileSync(`build/${cat}/index.html`, util.inspect(faces), 'utf8');
    });
}
catch (e) {
    console.log(e);
}
