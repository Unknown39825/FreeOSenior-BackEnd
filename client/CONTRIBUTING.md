# Contribution Guide

> Follow these steps to contribute to FreeOSenior:

### Setting up git

If you don't have git on your machine, [install it](https://help.github.com/articles/set-up-git/).

### Fork this repository

Fork this repository by clicking on the fork button on the top of this page.
This will create a copy of this repository in your account.

### Clone the repository

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon.

Open a terminal and run the following git command:

```
git clone "url you just copied"
```

where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

or

just copy paste this command on your teminal:

```
git clone https://github.com/iamparasbansal/FreeOSenior-Frontend.git
```

### Create a branch

Change to the repository directory on your computer (if you are not already there):

```
cd directory-name
```

Now create a branch using the `git checkout` command:

```
git checkout -b your-new-branch-name
```

For example:

```
git checkout -b update
```

Please Note : Name your branch in accordance with you work.

### Make necessary changes and commit those changes

If you go to the project directory and execute the command `git status`, you'll see there are changes.

Add those changes to the branch you just created using the command:

```
git add .
```

Now commit those changes using the `git commit` command:

```
git commit -m "Add your committing message here"
```

**Note:** Please visit the open issues section before making any contribution.

### Push changes to GitHub

Push your changes using the command `git push`:

```
git push origin <add-your-branch-name>
```

replacing `<add-your-branch-name>` with the name of the branch you created earlier.

### Submit your changes for review

If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.

Now submit the pull request.
