# project-oct-2017

## Prerequisites
* git (https://github.com/git-for-windows/git/releases/latest for windows users)
* node LTS https://nodejs.org/en/

## Setup
1) git clone this repository
2) npm install
3) npm run watchjs (this build your js files using webpack and watch for changes)
4) npm start
5) Go to `http://localhost:3000/` in your browser

## Git Tutorial/Cheat Sheet
https://www.youtube.com/watch?v=0fKg7e37bQE

Please make sure to add your SSH key to your Github profile.
https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html

The following is a typical git workflow from start to finish of checking in a change.

Parameters in brackets are optional
* git clone `repository` - Use SSH to avoid having to enter your password all the time
1) git checkout master (if not already on master branch) - Switches to the master branch
2) git pull - Brings your local repository up to date with Github master branch
3) git checkout [-b] `branch` - Switches to the desired branch (-b creates a new branch)
4) git status - Shows the list of changed files (red are unstaged changes)
5) git diff - Shows a detailed view of all changes to all files so that you can make sure you are only committing intended changes
6) git add . - Adds all unstaged changes for commit
7) git status - Shows changes files (should now all be green)
8) git commit -m "`your commit message`" - Commits staged changes
9) git push - Pushes your changes to the remote repository (Github)
10) goto 1)

If you run into any merge conflicts and are unfamiliar with how to resolve them, don't hesitate to reach out to one of the Decode coaches for some help. :)

Next step is to go to the github website and create a Pull Request for your branch and get one of your peers to review it.

Once the review is approved, Merge it!

## NPM Cheat Sheet
* npm install --save `package-name` - Installs the NPM package and saves the new entry in `package.json` so that others can do NPM install and pick up new dependencies
* npm run watchjs - Runs the webpack build for your JS files and rebuilds every time a file is changed. If this is not running, your changes will not be visible when you refresh the page.
* npm start - Starts the app on the configured port

## ChartJS Docs
http://www.chartjs.org/docs/latest/

## Query Examples
https://docs.google.com/document/d/1SOAkSfL-Ni6StNchDHzWbHcP30l58uKoujuzBO0squs/edit?usp=sharing

## Lex Tutorial
https://www.youtube.com/watch?v=5XfhTwVjwgQ
