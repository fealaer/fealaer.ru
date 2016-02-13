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

# Push new version of build to the gh-pages branch
git subtree push --prefix dist origin gh-pages -f

# Check out to master branch
git checkout master
