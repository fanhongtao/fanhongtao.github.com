#!/bin/bash
# This file is in PUBLIC DOMAIN. You can use it freely. No guarantee.
#
# This file is prepare Maven enviroment after install Maven.
# @author Fan Hongtao <fanhongtao@gmail.com>

old_path=`pwd`

mkdir maven
cd maven

# Execute common Maven commands
mvn archetype:generate -B -DarchetypeArtifactId=maven-archetype-quickstart -DgroupId=org.fanhongtao -DartifactId=test1 -Dversion=1.0-SNAPSHOT
cd test1
mvn help:describe -Dplugin=archetype

mvn dependency:analyze
mvn dependency:copy-dependencies 
mvn dependency:go-offline
mvn dependency:list

mvn help:help
mvn help:describe -Dplugin=archetype -Ddetail

mvn test
mvn javadoc:jar
mvn source:jar

# Download jars, and their sources,  used by daily work
cd ../
mkdir default
cd default
curl https://raw.github.com/fanhongtao/fanhongtao.github.com/master/attachments/default_pom.xml > pom.xml
mvn dependency:sources

# return 
cd "$old_path"
rm -rf maven
