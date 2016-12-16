# Disapproval APIs

This is a simple wrapper to [looks.wtf](https://github.com/leighmcculloch/looks.wtf) source data to provide a JSON formatted version. 
Actually this is published as a [GitHub Pages](https://pages.github.com/) at [disapi.grg.io/categories.json](http://disapi.grg.io/categories.json).  

(☞ﾟ∀ﾟ)☞

## Usage
Just go to [http://disapi.grg.io/categories.json](http://disapi.grg.io/categories.json) and use whatever you want!

## Customizing
I will be happy to accept pull requests.

or...  

Fork&clone the repo, configure your GitHub Pages to [publish from gh-pages branch](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages) and run:

```
npm install
npm run build
npm run deploy
```

This:

* installs required packages
* creates JSON files in build/directory
* deploys to GitHub Pages

## Credits
All the content is from [Leigh McCulloch](https://github.com/leighmcculloch), it's looks.wtf repo is linked via submodule and only re-formatted.
