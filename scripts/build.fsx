#r "paket:
nuget Fake.Core.Target
nuget Fake.Core.Process
nuget Fake.Core.Environment //"

#load "./.fake/build.fsx/intellisense.fsx"

open Fake.Core
open Fake.Core.Environment

let organizationName = "weeklybingo"
let imageName = "web.api"
let dockerImageName tag = sprintf "%s:%s" imageName tag

let getDockerEnv (env : string) =  
    match env.ToLower() with
    | "production" -> 
        ("../Dockerfile", "latest")
    | "development" ->  
        ("../Dockerfile.development", "dev")
    | _ ->
        ("../Dockerfile.development", "dev")

let travisBranchToEnviroment = lazy (
    let branch = environVar "TRAVIS_BRANCH"
    if branch = "master" then
        "production"
    else 
        "development"
)

let dockerBuild env =
    let result =
        Process.ExecAndReturnMessages(fun (info: ProcStartInfo) ->
            let (dockerfile, tag) = getDockerEnv env
            {info with
                FileName = "docker"
                Arguments = sprintf "build --rm -f %s -t %s ../" dockerfile (dockerImageName tag) }) (System.TimeSpan.FromMinutes 15.)
    if result.ExitCode <> 0 then failwith "Docker build failed"    

// *** Define Targets ***
Target.Create "Clean" (fun _ ->
  Trace.log " --- Cleaning stuff --- "
)

Target.Create "Build" (fun _ ->
  Trace.log " --- Building the app --- "
)

Target.Create "Deploy" (fun _ ->
  Trace.log " --- Deploying app --- "
)

Target.Create "DockerLogin" (fun _ ->
    let login = environVar "DOCKER_USERNAME"
    let password = environVar "DOCKER_PASSWORD"
    let result =
        Process.ExecAndReturnMessages(fun (info: ProcStartInfo) ->
            {info with
                FileName = "docker"
                Arguments = sprintf "login -u %s -p %s" login password }) (System.TimeSpan.FromMinutes 15.)
    if result.ExitCode <> 0 then failwith "Docker build failed"  
)

Target.Create "DockerBuild:Travis" (fun _ ->
    dockerBuild travisBranchToEnviroment.Value
)

Target.Create "DockerTag:Travis"  (fun _ ->
    let (_, tag) = getDockerEnv travisBranchToEnviroment.Value
    let result =
        Process.ExecAndReturnMessages(fun (info: ProcStartInfo) ->
            {info with
                FileName = "docker"
                Arguments = sprintf "tag %s:%s %s/%s:%s" imageName tag organizationName imageName tag}) (System.TimeSpan.FromMinutes 15.)
    if result.ExitCode <> 0 then failwith "Docker build failed"      
)

Target.Create "DockerPush:Travis"  (fun _ ->
    let (_, tag) = getDockerEnv travisBranchToEnviroment.Value
    let result =
        Process.ExecAndReturnMessages(fun (info: ProcStartInfo) ->
            {info with
                FileName = "docker"
                Arguments = sprintf "push %s/%s:%s" organizationName imageName tag }) (System.TimeSpan.FromMinutes 15.)
    if result.ExitCode <> 0 then failwith "Docker build failed"      
)


Target.Create "DockerBuild:Dev" (fun _ ->
    dockerBuild "development"
)

Target.Create "DockerBuild:Prod" (fun _ ->
    dockerBuild "production"
)  

open Fake.Core.TargetOperators

// *** Define Dependencies ***
"Clean"
  ==> "Build"
  ==> "Deploy"
"Clean"
    ==> "DockerBuild:Dev"
"Clean"
    ==> "DockerBuild:Prod"
"Clean"
    ==> "DockerLogin"
    ==> "DockerBuild:Travis"
    ==> "DockerTag:Travis"
    ==> "DockerPush:Travis"
// *** Start Build ***
Target.RunOrDefault "Deploy"