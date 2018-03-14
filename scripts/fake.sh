#!/bin/bash
dotnet restore scripts.csproj
dotnet fake $@