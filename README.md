# Introduction to DevOps
## Introduction

This guide is the written companion to the DevOps talk I gave at Dynamicweb Summit 2018. It is not intended as an ultimate guide into DevOps but rather as inspiration to get started with DevOps for your projects. The guide is revolves around a single example demo.

The project files that I used for setting up a Dynamicweb Rapido 3.0 project in Visual Studio including `.gitignore` files tailored for Dynamicweb templates and Rapido specifically as well as the associated `npm` and `webpack` configuration files are available for download here. Simply clone or download the repository.

In this guide, I'm using Azure DevOps (or Visual Studio Team Services, as it was called). However, the ideas are universal and can be used for any Continuous Integration and Continuous Deployment tools that you want to use.

## Conceptual overview

One important question to answer before we start is "What is DevOps?" DevOps is a process that adds value to your organization through automation. There are many parts to DevOps because it deals with all the different areas involved in moving a feature from an idea to the final deployed state.

You may not want to begin with a complicated DevOps workflow, but rather start with the parts that would give you the best return-on-investment fastest. For example, you may not want to have any deployment in your initial process, but start by adding code review and compilation validation processes. The beauty is that it can be added later, when you're ready.

## Getting started

Before you jump in with DevOps, there are some things you should give some consideration.

- How do I structure my code in source control?
- Is my project prepared for automation?
- How much DevOps to I want to start with?
- Where is the code going to end up?

### Prepare your code repository

This section describes a few different branching strategies that you can use to organize development. It's not possible to give a one-size-fits-all answer to which you should choose. In the end, the decision needs to be made by you and your team.

Certain source control systems allow for easier branching allowing for more friction-free adoption of some of these strategies. The mentioned workflows are generally meant for `git`, but if you use `tfvc`, you can take a look at this [article](https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/branching-strategies-with-tfvc?view=vsts) from Microsoft about branching strategies that work well with that source control system.

- [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [GitHub Flow](https://guides.github.com/introduction/flow)
- [Trunk-based Development](https://trunkbaseddevelopment.com)

### Getting the code ready to be automated

Making your code ready to be automated is fairly straight forward. You need to make sure that all actions needed to perform a build of you code can be scripted. In this example, I'm using a Visual Studio project and my code can, therefore, be built using `MSBuild`. Some parts of my project, JS and CSS specifically, are not using MSBuild. These elements are built using `webpack`.

This means that my project can be scripted in any environment where MSBuild (including build tools) and Node.js are available. You may use a different tool chain, but as long as it can be scripted, you can automate it.

There is one special concern that is not related to code but it's still important to consider, and that is assets. Assets like images, videos and documents. First thing to decide is whether or not these files belong in your code repository. If you don't add then to the repository, then you need to decide how these files are being deployed to the environments if required. Assets that are part of the project like icons and graphics should probably be under source control, but assets related to content like product images probably shouldn't. This repository does not contain any product images, so if you need them, you can download the full Rapido release from the download section of the [Dynamicweb Documentation site](https://doc.dynamicweb.com) (required login).

### Scoping the DevOps process

To get started with DevOps, you need to decide where you want to begin. The power of DevOps comes from just getting started.

While you may not need automatic deployment, you may want to make sure that the code still builds after commits. On top of that, you may want to make sure that the code still adheres to a test suite of unit and integration tests.

From here, you can build out your DevOps process to automate the deployment process into one or more environments and add monitoring of the running code.

### Defining deployment environments

If you need to set up deployment, you should define which environments you need and when code moves into these environments.

For many developers, the deployment stages usually look like this:\
**Development** -> **Test/QA** -> **Staging** -> **Production**

After defining the environments, you need to decide on some rules governing these environments. Maybe every successful build from the build pipeline should be deployed to **Test/QA** immediately and only moved to **Staging** after passing a test review. Maybe you want a manual interaction from a manager or other responsible person to decide when the code is moved from **Staging** to **Production**, or maybe you're development process includes rapid deployment and you want some code to be moved to **Production** after running successfully in **Staging** for a week without incident. It all comes down to your team and your project.

## Example

In this example, I'll use the files from this repository and show an automation pipeline for building and deploying Rapido 3.0 to three environments, just as described above.

The `src` folder contains an ASP.NET Web Application that targets .NET Framework 4.6.1 and contains all the templates and item types that Rapido 3.0 provides and a NuGet configuration that references relevant Dynamicweb assemblies allowing for IntelliSense in templates. In addition, there's a `webpack` configuration for building and bundling JS and CSS assets.

In the following subsections, I'll go over some of the details related to the project.

### NuGet

The project is set up for IntelliSense in the templates. To make that work properly, you need to make sure that the Dynamicweb package feed is configured. Add this NuGet feed [https://www.myget.org/F/dynamicweb-packages/api/v3/index.json](https://www.myget.org/F/dynamicweb-packages/api/v3/index.json) to the Package Manager in Visual Studio to allow all Visual Studio projects to use the feed.

### Local config-files

In Dynamicweb 9 and up, there's a option for overriding sections in the `GlobalSettings.aspx` configuration file. By adding `.config` files in the same location as GlobalSettings.aspx, you can tell Dynamicweb to ignore certain sections or values of the GlobalSettings in favor of the sections or values in the local config files. The ConfigurationManager in Dynamicweb is looking for files in a specific order. It will load all local config files in reverse alphabetical order, e.g., z.config is loaded before a.config. Lastly, GlobalSettings.aspx is loaded. When finding a value in the configuration, it will go through the configurations in the same order as they were loaded. This means, that you can override any configuration by having an updated config file loaded before another. **NOTE**: If you only want to override specific values and not a whole section, then you must still provide the full XML path to the overridden value.

Mostly, in a DevOps scenario, the related sections to override are the database section and the SMTP section. In this project, only the database section is overridden.

One final note on local config files. For a full environment deployment, you should consider how you want the local config files to be tracked. They should most likely not be in you main code repository as they will be different from environment to environment. Of course, you could have multiple config files in your repository and copy/rename them accordingly in the deployment pipeline, but at the very least, you need to consider how to handle this.

### Webpack and npm

The Rapido package allows for a couple of extension points. One is the `Ignite` CSS files and another is the `Custom` JS file. Both of these are handled by a webpack configuration in this project. You can read more about webpack [here](https://webpack.js.org/concepts). The usage of webpack is enabled by Node.js and npm.

The webpack configuration contains two parts:
- One part for compiling Ignite LESS and bundling into ignite.min.js
- One part for compiling Custom JS and bundling into custom.min.js

Due to the fact that webpack will compile and bundle those files, they are excluded from the repository. They will be generated by the build process so they do not need to be committed.

In the npm `package.json` config file, there are a couple of webpack-specific scripts: `build` and `watch`. To run them, type `npm run build` or `npm run watch` in the command line. The watch script will start webpack in watch mode, which means that it'll track when any dependent file is changed and rebuild the relevant asset. For example, if you change the `Templates/Designs/Rapido/css/ignite/layout/ecommerce/_product-list.less` while in watch mode, webpack will see it and rebuild the ignite.min.css output file.

### .gitignore files

There is a solution level gitignore file that is used to exclude all the things that we do not want in our repository for any projects. For example, the `packages` folder that NuGet created when it restores packages or the `bin` folder that is created when a project is built in Visual Studio.

Additionally, there is also a gitignore file in the Web Application project. This file contains all the template-specific files we do not want in the repository. These include the previously mentioned local config-files, the Dynamicweb license file as well as the parsed template files that Dynamicweb creates at runtime.

If you add more projects, you can add more nested ignore files if they need to handle different concerns. Of course, it's also an option to just have one combined gitignore file in the root of the solution if you don't want to deal with separate files.

### Pipelines

A couple of times in this document, I have talked about the build pipeline and the deployment pipeline. Let's go over them in more detail.

The pipelines are definitions of the steps required to perform a certain action. This may sound a little abstract, but basically it means that a pipeline specifies the steps required to either build the project or deploy the project to an environment.

While the pipeline configurations mentioned here are specific for Azure DevOps, the steps specified can be replicated in any CI/CD tool.

#### The 'Build' pipeline

The build pipeline contains all the actions that you would normally perform manually to build the project. It covers everything from invoking `msbuild.exe` to making sure required tools like Node.js and npm are installed. If your project uses external NuGet references, like the Dynamicweb packages, you also need to make sure that the NuGet tool is available and is aware of the Dynamicweb repository.

At a high level, the steps to build this project are these:
1. Get the code from the repository
2. Run npm to build CSS and JS
3. Run MSBuild to build any custom code
4. Run any potential unit and integration tests
5. Add files to a zip-file that can be passed to the deployment pipeline.

To build this project in Azure DevOps, we need to configure the build pipeline. Firstly, we need to specify where the pipeline runs the steps. You can read more about Azure DevOps agent pools [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/pools-queues?view=vsts), but I'll be using the `Hosted VS2017` pool that is provided by default as it provides a full Visual Studio 2017 environment with build tools. If we want the build process to be continuous, we also need to specify which repository/branch the pipeline should monitor for changes. This goes back to the selected branching strategy that was mentioned previously.

The following build steps should be configured to run on the agent.
1. Add the `npm` task and select the `install` command.
    - This will install all required package dependencies.
2. Add the `npm` task and select the `custom` command. Specify `run build` in the 'Command and arguments' field.
    - This will perform a build of the CSS and JS dependencies of the project and place the bundles in the correct location.
3. Add the `NuGet Tool Installer` task and specify the required version of NuGet.
    - This will make sure that NuGet is available to restore packages later in the pipeline.
4. Add the `Command Line` task and specify the commands to add the Dynamicweb repository to the sources list for NuGet and restore packages.
    - This will make sure that NuGet can find the required Dynamicweb packages and restores them so the actual build step has the required dependencies.
5. Add the `Visual Studio Build` task.
6. Add the `Archive Files` task to produce a zip-file.
7. Add the `Publish Build Artifacts` task to make the result of the build pipeline available to the deployment pipeline.

This project does not actually have any custom code that needs to be compiled. All templates are compiled by Dynamicweb and RazorEngine at runtime. Therefore, steps 3, 4 and 5 can be skipped for this project. If you add a new class library to the solution, you may need these steps.

#### The 'Deployment' pipeline

Now that we have the result of the build process, we're ready to deploy the project to our environments. The deployment, or release, pipeline is what we need to do this.

In a previous section, we discussed our environments. Now, we need to figure out how we get our code into those environments. There are multiple ways to accomplish this. We could use FTP, PowerShell or Azure tools if that's our destination. In this example, we'll use regular file copy but we're going to do it on the virtual machine that runs the web server. To access the server, we need a deployment group and an agent running on that machine. You can read more about that [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/deployment-groups/index?view=vsts).

Once we have our agent running, we can create our deployment pipeline. First we need to bind the pipeline to the build artifact, then we need to specify the stages of the deployment. Each stage will represent an environment in our example. Each stage will have their own pipeline which makes it possible to perform some clean-up or data initialization in the test environment so the code is always deployed to a known state. This is most likely not desirable for the production environment.

In our case, the pipelines is all the same and very simple:
1. Extract the files from the build artifact.
2. Copy the files to the solution folder.

You may need to stop and start the website in order to overwrite files that may be open in the web server's worker processes.
