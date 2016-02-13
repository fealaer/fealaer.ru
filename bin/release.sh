#!/bin/sh

# Check out to release branch
git checkout release

# Pull all changes from master to release
git rebase master

# Build new version of the application
gulp build

# Create commit message
DATE=`date +%Y-%m-%d:%H:%M`
COMMENT="New version from $DATE"

# Commit changes in dist to the release branch
git add dist
git commit -m "\"$COMMENT\""

# Delete old version of branch gh-pages
git push origin :gh-pages
# Push new version of build to the gh-pages branch
git subtree push --prefix dist origin gh-pages

# Check out to release.ru branch
git checkout release.ru

# Pull all changes from release to release.ru
git rebase release

echo 'fealaer.ru' > app/CNAME

# Build new version of the application
gulp build

# Commit changes in dist to the release branch
git add dist
git commit -m "\"$COMMENT\""

# Delete old version of branch gh-pages
git push fealaer.ru :gh-pages
# Push new version of build to the gh-pages branch
git subtree push --prefix dist fealaer.ru gh-pages

# Check out to master branch
git checkout master
